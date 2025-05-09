import { minutesToTimeString } from '../../../lib/timeUtils';

const BreakRow = ({
  breakStartTime,
  breakDuration,
  daysCount
}) => {
  const endTime = breakStartTime + breakDuration;

  return (
    <div className="grid grid-cols-7" style={{ gridTemplateColumns: `90px repeat(${daysCount}, 1fr)` }}>
      <div className="p-2 flex items-center justify-center">
        <div className="text-sm font-medium text-gray-500">
          {minutesToTimeString(breakStartTime)}
        </div>
      </div>

      {Array.from({ length: daysCount }).map((_, index) => (
        <div
          key={`break-${index}`}
          className="bg-amber-50 p-3 m-1 rounded-lg border border-amber-200 col-span-1 flex items-center justify-center"
        >
          <div className="text-center">
            <p className="font-medium text-amber-700">Break Time</p>
            <p className="text-xs text-amber-600">
              {minutesToTimeString(breakStartTime)} - {minutesToTimeString(endTime)}
            </p>
            <p className="text-xs text-amber-600 mt-1">
              {breakDuration} mins
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BreakRow;