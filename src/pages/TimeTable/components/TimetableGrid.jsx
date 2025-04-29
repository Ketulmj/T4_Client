import React from 'react';
import TimetableCell from './TimetableCell';
import BreakRow from './BreakRow';
import { getDayName, minutesToTimeString } from '../../../lib/timeUtils';


const TimetableGrid = ({
  timetable,
  breakStartTime,
  breakDuration,
  periodDuration,
  labDuration
}) => {
  // Find the position to insert the break based on start times
  const getBreakPosition = () => {
    if (!timetable || timetable.length === 0 || timetable[0].length === 0) return -1;

    for (let i = 0; i < timetable[0].length; i++) {
      if (timetable[0][i].startTime > breakStartTime) {
        return i;
      }
    }
    return timetable[0].length; // If no position found, put break at the end
  };

  const breakPosition = getBreakPosition();
  const daysCount = timetable.length;

  return (
    <div className="w-full overflow-x-auto ">
      <div className="min-w-[800px]">
        {/* Header Row with Day Names */}
        <div
          className="grid grid-cols-7 mb-2"
          style={{ gridTemplateColumns: `90px repeat(${daysCount}, 1fr)` }}
        >
          <div className="p-2"></div> {/* Empty corner cell */}
          {timetable.map((_, index) => (
            <div key={`day-${index}`} className="p-2 text-center">
              <h3 className="font-semibold text-gray-200">{getDayName(index)}</h3>
            </div>
          ))}
        </div>

        {/* Timetable Rows */}
        {timetable[0].map((_, periodIndex) => {
          // If we've reached the break position, insert the break row
          if (periodIndex === breakPosition && breakDuration > 0) {
            return (
              <React.Fragment key={`period-break`}>
                <BreakRow
                  breakStartTime={breakStartTime}
                  breakDuration={breakDuration}
                  daysCount={daysCount}
                />
                <div
                  className="grid grid-cols-7 mb-2 "
                  style={{ gridTemplateColumns: `90px repeat(${daysCount}, 1fr)` }}
                >
                  <div className="p-2 flex items-center justify-center">
                    <div className="text-sm font-medium text-gray-500">
                      {minutesToTimeString(timetable[0][periodIndex].startTime)}
                    </div>
                  </div>

                  {timetable.map((day, dayIndex) => (
                    <div key={`cell-${dayIndex}-${periodIndex}`} className="p-1 ">
                      <TimetableCell
                        startTime={day[periodIndex].startTime}
                        subject={day[periodIndex].subject}
                        periodDuration={periodDuration}
                        labDuration={labDuration}
                      />
                    </div>
                  ))}
                </div>
              </React.Fragment>
            );
          }

          return (
            <div
              key={`period-${periodIndex}`}
              className="grid grid-cols-7 mb-2"
              style={{ gridTemplateColumns: `90px repeat(${daysCount}, 1fr)` }}
            >
              <div className="p-2 flex items-center justify-center">
                <div className="text-sm font-medium text-gray-200">
                  {minutesToTimeString(timetable[0][periodIndex].startTime)}
                </div>
              </div>

              {timetable.map((day, dayIndex) => (
                <div key={`cell-${dayIndex}-${periodIndex}`} className="p-1">
                  <TimetableCell
                    startTime={day[periodIndex].startTime}
                    subject={day[periodIndex].subject}
                    periodDuration={periodDuration}
                    labDuration={labDuration}
                  />
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimetableGrid;