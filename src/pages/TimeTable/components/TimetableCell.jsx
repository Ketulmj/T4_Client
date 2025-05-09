import { minutesToTimeString } from '../../../lib/timeUtils';

const TimetableCell = ({
  startTime,
  subject,
  periodDuration,
  labDuration
}) => {
  const duration = subject.IsLab ? labDuration : periodDuration;
  const endTime = startTime + duration;
  return (
    <div
      className={`p-3 rounded-lg border ${subject.IsLab
        ? 'bg-indigo-50 border-indigo-200'
        : 'bg-white border-gray-200'
        } h-full flex flex-col`}
    >
      <div className="flex justify-between items-start mb-1 ">
        <h3 className={`font-medium ${subject.IsLab ? 'text-indigo-700' : 'text-gray-800'}`}>
          {subject.Name}
        </h3>
        {subject.IsLab && (
          <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-0.5 rounded font-medium">
            Lab
          </span>
        )}
      </div>

      <p className="text-xs text-gray-500">
        {minutesToTimeString(startTime)} - {minutesToTimeString(endTime)}
      </p>

      <div className="mt-auto pt-2 flex items-center">
        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-700">
          {subject.Teacher.Name.charAt(0)}
        </div>
        <span className="ml-2 text-sm text-gray-600">{subject.Teacher.Name}</span>
      </div>
    </div>
  );
};

export default TimetableCell;