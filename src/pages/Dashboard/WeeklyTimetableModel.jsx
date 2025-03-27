import React from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

const timeSlots = [
    "9:00 AM - 9:45 AM",
    "10:00 AM - 10:45 AM",
    "11:00 AM - 11:45 AM",
    "12:00 PM - 12:45 PM",
    "1:30 PM - 2:15 PM",
    "2:30 PM - 3:15 PM"
];

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
                        {timetable.className} - {timetable.division} Weekly Schedule
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
                        <table className="w-full border-collapse bg-[#0A0A0A] rounded-lg overflow-hidden">
                            <thead>
                                <tr>
                                    <th className="bg-[#1A1A1A] p-4 text-white font-medium border-b border-r border-[#4D7CFF]/20 min-w-[150px] text-center">
                                        Time Slot
                                    </th>
                                    {days.map(day => (
                                        <th key={day} className="bg-[#1A1A1A] p-4 text-white font-medium border-b border-r border-[#4D7CFF]/20 min-w-[150px] text-center">
                                            {day}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {timeSlots.map((timeSlot, index) => (
                                    <tr key={index} className="group">
                                        <td className="bg-[#1A1A1A]/50 p-4 text-white border-r border-b border-[#4D7CFF]/20 font-medium">
                                            {timeSlot}
                                        </td>
                                        {days.map(day => (
                                            <td key={day} className="p-4 border-r border-b border-[#4D7CFF]/20 group-hover:bg-[#1A1A1A]/30 transition-colors duration-200">
                                                {mockWeekSchedule[day]?.[index] ? (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 5 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="space-y-2 transition-all duration-200 hover:translate-y-[-2px] text-center hover:text-[#4D7CFF]"
                                                    >
                                                        <div className="text-white font-medium">
                                                            {mockWeekSchedule[day][index].subject}
                                                        </div>
                                                        <div className="text-white/70 text-sm flex flex-col gap-1">
                                                            <span>{mockWeekSchedule[day][index].teacher}</span>
                                                            <span className="text-white/50 text-xs">
                                                                {mockWeekSchedule[day][index].duration}
                                                            </span>
                                                        </div>
                                                    </motion.div>
                                                ) : (
                                                    <div className='text-white/30 text-center'>--</div>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default WeeklyTimetableModel;