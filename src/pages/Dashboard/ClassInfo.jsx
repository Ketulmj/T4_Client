import React from 'react';
import { motion } from 'framer-motion';
import { ClassData } from '../types/timetable';
import { minutesToTimeString } from '../lib/timeUtils';
import { Users, BookOpen, Coffee, Clock, BeakerIcon } from 'lucide-react';


const ClassInfo = ({ classData }) => {
  return (
    <motion.div 
      className="bg-gray-800 rounded-lg p-4 md:p-6 shadow-xl"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-blue-400" />
            {classData.className} {classData.division}
          </h2>
          <p className="text-gray-400 mt-1">Academic Year: {classData.year}</p>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Coffee className="h-5 w-5 text-amber-400" />
            <div>
              <h3 className="font-medium text-amber-300">Break Time</h3>
              <p className="text-amber-200/80 text-sm">
                {minutesToTimeString(classData.breakStartTime)} • {classData.breakDuration} min
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-400" />
            <div>
              <h3 className="font-medium text-blue-300">Period Duration</h3>
              <p className="text-blue-200/80 text-sm">{classData.periodDuration} min</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <BeakerIcon className="h-5 w-5 text-green-400" />
            <div>
              <h3 className="font-medium text-green-300">Lab Duration</h3>
              <p className="text-green-200/80 text-sm">{classData.labDuration} min</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ClassInfo;