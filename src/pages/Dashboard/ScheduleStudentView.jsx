import React from 'react';
import { Clock, GraduationCap, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const ScheduleStudentView = ({ mockWeekSchedule, selectedDay, convertToSimpleTime }) => (
  <div className="glass-effect rounded-xl backdrop-blur-md border border-[#4D7CFF]/20 shadow-md hover-glow">
    <div className="p-4 border-b border-[#4D7CFF]/20 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Clock className="w-6 h-6 text-[#4D7CFF]" />
        <h3 className="text-xl font-bold text-white neon-glow">Schedule for {selectedDay}</h3>
      </div>
      <h3 className="text-[#4D7CFF] font-medium">Break at 2 PM</h3>
    </div>
    <div className="p-4 space-y-4">
      {!mockWeekSchedule[selectedDay] && 
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white font-bold text-center py-4"
        >
          No Schedule Available
        </motion.p>
      }
      {mockWeekSchedule[selectedDay]?.map((schedule, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="glass-effect p-4 rounded-xl border border-[#4D7CFF]/20 hover:border-[#4D7CFF]/40 transition-all duration-200 group"
        >
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 p-2 rounded-lg bg-[#4D7CFF]/10 group-hover:bg-[#4D7CFF]/20 transition-colors">
              <BookOpen className="h-5 w-5 text-[#4D7CFF]" />
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="text-white font-medium text-lg">{schedule.subject}</h4>
                    <span className="text-[#4D7CFF]">•</span>
                    <div className="flex items-center gap-1.5">
                      <GraduationCap className="h-4 w-4 text-[#4D7CFF]" />
                      <span className="text-white/70">{schedule.teacher}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-white/50 text-sm">60 minutes</p>
                  </div>
                </div>
                <div className="sm:text-right">
                  <p className="text-[#4D7CFF] font-medium">{convertToSimpleTime(schedule.startTime)}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default ScheduleStudentView;