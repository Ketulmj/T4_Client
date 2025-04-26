import React from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import ShowTimeTable from '../../components/showTimeTable'

const WeeklyTimetableModel = ({ timetable, onClose, isOpen, days, mockWeekSchedule }) => {
    return (
        <div
            className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-300 ${
                isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ 
                    opacity: isOpen ? 1 : 0,
                    scale: isOpen ? 1 : 0.95,
                    y: isOpen ? 0 : 20
                }}
                transition={{ duration: 0.3 }}
                className="bg-[#0A0A0A] rounded-xl w-[95%] max-w-7xl max-h-[90vh] overflow-hidden"
            >
                <div className="sticky top-0 z-10 bg-[#0A0A0A] border-b border-[#4D7CFF]/20 p-4 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-white">
                        {timetable.className} - {timetable.division}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-[#4D7CFF]/10 rounded-full transition-colors"
                    >
                        <X className="text-white" size={24} />
                    </button>
                </div>
                <div className="p-4 md:p-6 overflow-x-auto">
                    <div className="min-w-[900px]">
                        <ShowTimeTable timetable={timetable.timetable}/>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default WeeklyTimetableModel;