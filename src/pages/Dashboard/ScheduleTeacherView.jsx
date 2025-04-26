import React, { useMemo, useState,useEffect } from 'react';
import { Calendar, AlertTriangle, Clock, GraduationCap, UserX } from 'lucide-react';

const ScheduleTeacherView = ({
  selectedDay,
  days,
  absentClasses,
  convertToSimpleTime,
  setAbsentClasses,
  setConfirmDialog,

}) => {


  const mockTeacherSchedule =[
    { "subject": "Maths", "startTime": 500, "className": "Class X - A", "day": 1, "isLab": false, "duration": 50 },
    { "subject": "Physics", "startTime": 580, "className": "Class XI - B", "day": 1, "isLab": true, "duration": 45 },
    { "subject": "Chemistry", "startTime": 660, "className": "Class XII - C", "day": 1, "isLab": true, "duration": 60 },
    { "subject": "Biology", "startTime": 740, "className": "Class IX - D", "day": 1, "isLab": false, "duration": 55 },
    { "subject": "English", "startTime": 820, "className": "Class VIII - E", "day": 1, "isLab": false, "duration": 40 },
    { "subject": "History", "startTime": 900, "className": "Class VII - F", "day": 1, "isLab": false, "duration": 60 },
    { "subject": "Geography", "startTime": 500, "className": "Class VI - G", "day": 2, "isLab": true, "duration": 45 },
    { "subject": "Computer Science", "startTime": 580, "className": "Class X - A", "day": 2, "isLab": true, "duration": 60 },
    { "subject": "Physics", "startTime": 660, "className": "Class XI - B", "day": 2, "isLab": false, "duration": 55 },
    { "subject": "Chemistry", "startTime": 740, "className": "Class XII - C", "day": 2, "isLab": true, "duration": 50 },
    { "subject": "Biology", "startTime": 820, "className": "Class IX - D", "day": 2, "isLab": false, "duration": 60 },
    { "subject": "English", "startTime": 900, "className": "Class VIII - E", "day": 2, "isLab": false, "duration": 40 },
    { "subject": "History", "startTime": 500, "className": "Class VII - F", "day": 3, "isLab": false, "duration": 45 },
    { "subject": "Maths", "startTime": 580, "className": "Class VI - G", "day": 3, "isLab": false, "duration": 60 },
    { "subject": "Computer Science", "startTime": 660, "className": "Class X - A", "day": 3, "isLab": true, "duration": 55 },
    { "subject": "Geography", "startTime": 740, "className": "Class XI - B", "day": 3, "isLab": false, "duration": 50 },
    { "subject": "Maths", "startTime": 820, "className": "Class XII - C", "day": 3, "isLab": false, "duration": 60 },
    { "subject": "Biology", "startTime": 900, "className": "Class IX - D", "day": 3, "isLab": true, "duration": 45 },
    { "subject": "Physics", "startTime": 500, "className": "Class VIII - E", "day": 4, "isLab": false, "duration": 50 },
    { "subject": "Chemistry", "startTime": 580, "className": "Class VII - F", "day": 4, "isLab": true, "duration": 60 },
    { "subject": "English", "startTime": 660, "className": "Class VI - G", "day": 4, "isLab": false, "duration": 55 },
    { "subject": "History", "startTime": 740, "className": "Class X - A", "day": 4, "isLab": false, "duration": 40 },
    { "subject": "Maths", "startTime": 820, "className": "Class XI - B", "day": 4, "isLab": false, "duration": 45 },
    { "subject": "Computer Science", "startTime": 900, "className": "Class XII - C", "day": 4, "isLab": true, "duration": 60 },
    { "subject": "Geography", "startTime": 500, "className": "Class IX - D", "day": 5, "isLab": false, "duration": 50 },
    { "subject": "Biology", "startTime": 580, "className": "Class VIII - E", "day": 5, "isLab": true, "duration": 55 },
    { "subject": "Physics", "startTime": 660, "className": "Class VII - F", "day": 5, "isLab": false, "duration": 40 },
    { "subject": "Chemistry", "startTime": 740, "className": "Class VI - G", "day": 5, "isLab": true, "duration": 60 },
    { "subject": "English", "startTime": 820, "className": "Class X - A", "day": 5, "isLab": false, "duration": 45 },
    { "subject": "History", "startTime": 900, "className": "Class XI - B", "day": 5, "isLab": false, "duration": 50 }
  ]
  

  const [subjectsOfTheDay, setSubjectsOfTheDay] = useState(mockTeacherSchedule.filter(period => period.day == days.indexOf(selectedDay)))

  // Get current date information
  const currentDate = useMemo(() => {
    const now = new Date();
    const currentDay = days[now.getDay()];
    return { currentDay };
  }, []);
  

  useEffect(() => {
    setSubjectsOfTheDay(mockTeacherSchedule.filter(period => period.day == days.indexOf(selectedDay)))
  }, [selectedDay])
  


  // Format selected date for display
  const selectedDate = useMemo(() => {
    const date = new Date();
    const dayIndex = days.indexOf(selectedDay);
    date.setDate(date.getDate() - (date.getDay() - dayIndex - 1));
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, [selectedDay, days]);

  // Check if selected day is in the past
  const isDayInPast = useMemo(() => {
    const currentDayIndex = days.indexOf(currentDate.currentDay);
    const selectedDayIndex = days.indexOf(selectedDay);
    return selectedDayIndex < currentDayIndex;
  }, [selectedDay, currentDate.currentDay, days]);

  const handleAbsentClick = (scheduleKey, isAlreadyAbsent, subject, className) => {
    if (isDayInPast) {
      return; // Don't allow marking absent for past days
    }
    setConfirmDialog(prev => {
      return {
        isOpen: true,
        scheduleKey,
        isUnmarking: isAlreadyAbsent,
        subject,
        className,
        date: selectedDate,
        deleteTableId: prev.deleteTableId
      }
    });
  };

  return (
    <div className="bg-zinc-800 rounded-xl border border-white/10">
      <div className="p-4 border-b border-white/10">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-white">Schedule for {selectedDay}</h3>
          <div className="flex items-center gap-2 text-white/70">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">{selectedDate}</span>
          </div>
          {isDayInPast && (
            <div className="mt-2 text-yellow-500/90 text-sm flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Cannot mark absences for past days</span>
            </div>
          )}
        </div>
      </div>
      <div className="p-4 space-y-4">
        {
          subjectsOfTheDay.length<=0?
          <p className='text-white text-center font-bold'>There are no scheduled classes for any subject on {selectedDay}</p>
          :
          subjectsOfTheDay.map((schedule, index) => {
            const isAbsent = absentClasses.includes(`${selectedDay}-${index}`); 
            return (
              <div
                key={`${selectedDay}-${index}`}
                className={`flex items-center gap-4 bg-zinc-900 p-4 rounded-lg border border-white/10 transition-colors ${isAbsent ? 'bg-red-900/20 border-red-500/30' : 'hover:bg-zinc-900/70'
                  }`}
              >
                <div className="flex-shrink-0">
                  <Clock className="h-5 w-5 text-white/70" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-white font-medium">{schedule.subject}</h4>
                        <span className="text-white/50">•</span>
                        <div className="flex items-center gap-1.5 text-white/70">
                          <GraduationCap className="h-4 w-4" />
                          <span>{schedule.className}</span>
                        </div>
                      </div>
                      <p className="text-white/50 text-sm">{schedule.duration} min</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleAbsentClick(`${selectedDay}-${index}`, isAbsent, schedule.subject, schedule.class)}
                        disabled={isDayInPast || isAbsent}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${isAbsent
                          ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30 cursor-not-allowed'
                          : isDayInPast
                            ? 'bg-zinc-700/20 text-white/50 cursor-not-allowed'
                            : 'bg-zinc-700/50 text-white hover:bg-zinc-700'
                          }`}
                      >
                        <UserX className="h-4 w-4" />
                        {isAbsent ? 'Marked Absent' : 'Mark Absent'}
                      </button>
                      <p className="text-white font-medium">{convertToSimpleTime(schedule.startTime)}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default ScheduleTeacherView;