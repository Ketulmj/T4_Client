import React from 'react';
import { minutesToTimeString, calculateEndTime, formatTimeRange } from '../lib/timeUtils';
import { motion } from 'framer-motion';
import { Clock, BeakerIcon } from 'lucide-react';

const getAllTimeSlots = (timetable, breakStartTime, breakDuration) => {
  const allTimes = new Set();

  // Add all class start times

  timetable.forEach(day => {
    day.forEach(slot => {
      allTimes.add(slot.startTime);
    });
  });

  // Add break start time if not already included
  allTimes.add(breakStartTime);

  // Add break end time
  const breakEndTime = breakStartTime + breakDuration;
  allTimes.add(breakEndTime);

  return [...allTimes].sort((a, b) => a - b);
};

const findClassForTimeSlot = (
  dayIndex,
  timeSlot,
  timetable,
  breakStartTime,
  breakDuration
) => {
  // Check if this is a break time slot
  if (timeSlot === breakStartTime) {
    return { isBreak: true, classInfo: null };
  }

  // Check if this is within break time (but not the start)
  if (timeSlot > breakStartTime && timeSlot < (breakStartTime + breakDuration)) {
    return { isBreak: true, classInfo: null };
  }

  const daySchedule = timetable[dayIndex] || [];

  // Find class that starts at this time slot
  const classInfo = daySchedule.find((slot) => slot.startTime === timeSlot);

  return { isBreak: false, classInfo: classInfo || null };
};

const ShowTimeTable = ({ timetableSchedule }) => {
  const ClassData = timetableSchedule
  const { timetable, breakStartTime, breakDuration, periodDuration, labDuration } = ClassData;
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const timeSlots = getAllTimeSlots(timetable, breakStartTime, breakDuration);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="sticky top-0 bg-[#0A0A0A] z-10">
          <tr>
            <th className="bg-[#4D7CFF]/10 p-2 text-white font-medium border-b border-r border-[#4D7CFF]/20 min-w-[120px] text-center">
              Time Slot
            </th>
            {days.map((day) => (
              <th key={day} className="bg-[#4D7CFF]/10 p-2 text-white font-medium border-b border-r border-[#4D7CFF]/20 min-w-[120px] text-center">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((timeSlot, index) => {
            const isBreakStart = timeSlot === breakStartTime;
            const isWithinBreak = timeSlot >= breakStartTime && timeSlot < (breakStartTime + breakDuration);

            return (
              <tr
                key={timeSlot}
                className={`group ${isWithinBreak ? 'break-row' : ''}`}
              >
                <td className={`${isWithinBreak ? 'bg-amber-500/20' : 'bg-[#4D7CFF]/5'} p-2 text-white border-r border-b border-[#4D7CFF]/20 font-medium text-center text-sm`}>
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span>{minutesToTimeString(timeSlot)}</span>
                  </div>
                  {isBreakStart && (
                    <div className="text-xs text-amber-300 mt-1">
                      Break Time ({breakDuration} min)
                    </div>
                  )}
                </td>
                {days.map((day, dayIndex) => {
                  const { isBreak, classInfo } = findClassForTimeSlot(dayIndex, timeSlot, timetable, breakStartTime, breakDuration);

                  return (
                    <td
                      key={`${day}-${timeSlot}`}
                      className={`p-2 border-r border-b border-[#4D7CFF]/20 ${isBreak
                          ? 'bg-amber-500/10 text-amber-300'
                          : 'group-hover:bg-[#4D7CFF]/5'
                        } transition-colors duration-200`}
                    >
                      {isBreak ? (
                        <motion.div
                          initial={{ opacity: 0.8 }}
                          whileHover={{ opacity: 1 }}
                          className="space-y-1 flex flex-col items-center"
                        >
                          <div className="text-amber-300 font-medium text-sm">Break Time</div>
                          <div className="text-amber-200/70 text-xs">
                            {formatTimeRange(breakStartTime, breakStartTime + breakDuration)}
                          </div>
                        </motion.div>
                      ) : classInfo ? (
                        <motion.div
                          whileHover={{ y: -2 }}
                          className="space-y-1 flex flex-col items-center relative"
                        >
                          <div className="flex items-center gap-1">
                            <div className="text-white font-medium flex items-center gap-1 text-sm">
                              {classInfo.subject.name}
                              {classInfo.subject.isLab && (
                                <span className="text-xs px-2 mt-0.5 ml-0.75 py-0.5 bg-[#4D7CFF]/20 rounded-full text-[#4D7CFF] flex items-center gap-1">
                                  <BeakerIcon className="w-3 h-3" />
                                  Lab ({labDuration} min)
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-[#4D7CFF] text-xs">
                            {classInfo.subject.teacher.name}
                          </div>
                          <div className="text-gray-400 text-xs">
                            {formatTimeRange(
                              classInfo.startTime,
                              calculateEndTime(
                                classInfo.startTime,
                                classInfo.subject.isLab ? labDuration : periodDuration
                              )
                            )}
                          </div>
                        </motion.div>
                      ) : (
                        <div className="space-y-1 flex flex-col items-center text-[#4D7CFF]/50">--</div>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ShowTimeTable;