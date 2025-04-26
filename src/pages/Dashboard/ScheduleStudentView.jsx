import React from 'react';
import { Clock, GraduationCap, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import ShowTimeTable from '../../components/showTimeTable'

const ScheduleStudentView = ({ mockWeekSchedule, selectedDay, convertToSimpleTime }) => (
  <div className="glass-effect rounded-xl backdrop-blur-md border border-[#4D7CFF]/20 shadow-md hover-glow">
    <div className="p-4 border-b border-[#4D7CFF]/20 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Clock className="w-6 h-6 text-[#4D7CFF]" />
        <h3 className="text-xl font-bold text-white neon-glow">Schedule for {mockWeekSchedule[0].className}</h3>
      </div>
      <h3 className="text-[#4D7CFF] font-medium">Break at 2 PM</h3>
    </div>
    <div className="p-4 space-y-4">
     
        <ShowTimeTable timetableSchedule={mockWeekSchedule[0]}/>
    </div>
  </div>
);

export default ScheduleStudentView;