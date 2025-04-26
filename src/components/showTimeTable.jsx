import React, { useState,useEffect } from 'react'
import { minutesToTimeString } from '../lib/timeUtils';
import {motion} from 'framer-motion'

const getAllTimeSlots = (timetable) => {
    const allTimes = new Set();
    timetable.forEach(day => {
        day.forEach(slot => {
            allTimes.add(slot.startTime);
        });
    });
    return [...allTimes].sort((a, b) => a - b);
};


const findClassForTimeSlot = (dayIndex, timeSlot,timetable) => {
    const daySchedule = timetable[dayIndex] || [];
    return daySchedule.find(slot => slot.startTime === timeSlot) || null;
};


const ShowTimeTable = ({timetable}) => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const [timeSlots] = useState(getAllTimeSlots(timetable));

    return (
        <div>
            <table className="w-full border-collapse">
                <thead className="sticky top-0 bg-[#0A0A0A] z-10">
                    <tr>
                        <th className="bg-[#4D7CFF]/10 p-2 text-white font-medium border-b border-r border-[#4D7CFF]/20 min-w-[120px] text-center">
                            Time Slot
                        </th>
                        {days.map((day, index) => (
                            <th key={day} className="bg-[#4D7CFF]/10 p-2 text-white font-medium border-b border-r border-[#4D7CFF]/20 min-w-[120px] text-center">
                                {day}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {timeSlots.map((timeSlot) => (
                        <tr key={timeSlot} className="group">
                            <td className="bg-[#4D7CFF]/5 p-2 text-white border-r border-b border-[#4D7CFF]/20 font-medium text-center text-sm">
                                {minutesToTimeString(timeSlot)}
                            </td>
                            {days.map((day, dayIndex) => {
                                const classInfo = findClassForTimeSlot(dayIndex, timeSlot,timetable);

                                return (
                                    <td key={`${day}-${timeSlot}`} className="p-2 border-r border-b border-[#4D7CFF]/20 group-hover:bg-[#4D7CFF]/5 transition-colors duration-200">
                                        {classInfo ? (
                                            <motion.div
                                                whileHover={{ y: -2 }}
                                                className={`space-y-1 flex flex-col items-center relative ${classInfo.subject.isLab ? 'lab-subject' : ''
                                                    }`}
                                            >
                                                <div className="flex items-center gap-1">
                                                    <div className="text-white font-medium flex items-center gap-1 text-sm">
                                                        {classInfo.subject.name}
                                                        {classInfo.subject.isLab && (
                                                            <span className="text-xs px-2 mt-0.5 ml-0.75 py-0.5 bg-[#4D7CFF]/20 rounded-full text-[#4D7CFF]">
                                                                Lab
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="text-[#4D7CFF] text-xs">
                                                    {classInfo.subject.teacher.name}
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <div className="space-y-1 flex flex-col items-center text-[#4D7CFF]/50">--</div>
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ShowTimeTable
