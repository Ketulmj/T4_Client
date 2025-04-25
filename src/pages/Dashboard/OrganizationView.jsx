import React from 'react';
import { Trash2, Clock, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import ShowTimeTable from '../../components/showTimeTable';

const OrganizationView = ({ mockTimetables, setSelectedTimetable, setIsModalOpen, setConfirmDialog, confirmDialog }) => {
  
  const handleTimetableClick = (timetable) => {
    setSelectedTimetable(timetable);
    setIsModalOpen(true);
  };

  const handleDelete = (e, timetableId) => {
    e.stopPropagation();
    setConfirmDialog({
      isOpen: true,
      isUnmarking: true,
      deleteTableId: timetableId
    });
  };
  return (
    <div className="glass-effect rounded-xl backdrop-blur-md border border-[#4D7CFF]/20 shadow-md hover-glow">
      <div className="p-4 border-b border-[#4D7CFF]/20 flex items-center gap-2">
        <Clock className="w-6 h-6 text-[#4D7CFF]" />
        <h3 className="text-xl font-bold text-white neon-glow">Created Timetables</h3>
      </div>
      <div className="p-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockTimetables.map((timetable, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="glass-effect p-4 rounded-xl border border-[#4D7CFF]/20 cursor-pointer hover:border-[#4D7CFF]/40 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl relative group"
            onClick={() => handleTimetableClick(timetable)}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={(e) => handleDelete(e, timetable.id)}
              className="absolute top-3 right-3 p-2 rounded-lg bg-[#4D7CFF]/10 opacity-0 group-hover:opacity-100 hover:bg-red-500/20 transition-all duration-200"
            >
              <Trash2 className="w-4 h-4 text-red-400" />
            </motion.button>
            <div className="flex flex-col gap-2">
              <div>
                <h4 className="text-white font-medium text-lg">{timetable.className} - {timetable.division}</h4>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-[#4D7CFF]/20">
                <div className="flex items-center gap-2 text-white/70">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{timetable.totalSubjects} Subjects</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{timetable.totalTeachers} Teachers</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OrganizationView;