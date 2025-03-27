import React, { useState } from 'react';
import { RefreshCw, Check, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from "react-helmet-async";
import Navbar from '../../components/Navbar';
import logo from '../../public/logo.png'

const timeSlots = [
  "9:00 AM - 9:45 AM",
  "10:00 AM - 10:45 AM",
  "11:00 AM - 11:45 AM",
  "12:00 PM - 12:45 PM",
  "1:30 PM - 2:15 PM",
  "2:30 PM - 3:15 PM"
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const mockSchedule = {
  "Monday": [
    { subject: "Physics", teacher: "Frank_Physics" },
    { subject: "Chemistry", teacher: "Henry_Chem" },
    { subject: "History", teacher: "Eva_History" },
    { subject: "Science", teacher: "Charlie_Sci" },
    { subject: "", teacher: "" },
    { subject: "", teacher: "" }
  ],
  "Tuesday": [
    { subject: "History", teacher: "Eva_History" },
    { subject: "Physics", teacher: "Frank_Physics" },
    { subject: "Biology", teacher: "Grace_Biology" },
    { subject: "Science", teacher: "Charlie_Sci" },
    { subject: "", teacher: "" },
    { subject: "", teacher: "" }
  ],
  "Wednesday": [
    { subject: "Physics", teacher: "Frank_Physics" },
    { subject: "Science", teacher: "Charlie_Sci" },
    { subject: "Biology", teacher: "Grace_Biology" },
    { subject: "History", teacher: "Eva_History" },
    { subject: "", teacher: "" },
    { subject: "", teacher: "" }
  ],
  "Thursday": [
    { subject: "History", teacher: "Eva_History" },
    { subject: "Chemistry", teacher: "Henry_Chem" },
    { subject: "Science", teacher: "Charlie_Sci" },
    { subject: "Physics", teacher: "Frank_Physics" },
    { subject: "", teacher: "" },
    { subject: "", teacher: "" }
  ],
  "Friday": [
    { subject: "", teacher: "" },
    { subject: "", teacher: "" },
    { subject: "", teacher: "" },
    { subject: "", teacher: "" },
    { subject: "", teacher: "" },
    { subject: "", teacher: "" }
  ],
  "Saturday": [
    { subject: "", teacher: "" },
    { subject: "", teacher: "" },
    { subject: "", teacher: "" },
    { subject: "", teacher: "" },
    { subject: "", teacher: "" },
    { subject: "", teacher: "" }
  ]
};

const AfterTimetable = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleRegenerate = () => {
    setIsConfirmed(false);
  };

  const handleConfirm = () => {
    setIsConfirmed(true);
  };

  return (
    <>
      <Helmet>
      <title>TimeTable | Time Fourthe</title>
  <link rel="icon" type="image/png" href={logo} />
      </Helmet>
      <Navbar role={'organization'}/>
      <div className="min-h-screen bg-[#0A0A0A] p-6 relative overflow-hidden hexagon-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="max-w-[95%] mx-auto relative z-10"
        >
          <div className="glass-effect rounded-xl overflow-hidden backdrop-blur-md border border-[#4D7CFF]/20 shadow-md hover-glow">
            <div className="p-4 border-b border-[#4D7CFF]/20 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Clock className="w-6 h-6 text-[#4D7CFF]" />
                <h1 className="text-xl font-bold text-white neon-glow">Class X - A Weekly Schedule</h1>
              </div>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: isConfirmed ? 1 : 1.02 }}
                  onClick={handleRegenerate}
                  disabled={isConfirmed}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 
                    ${isConfirmed 
                      ? 'bg-[#4D7CFF]/20 cursor-not-allowed' 
                      : 'bg-[#4D7CFF]/10 hover:bg-[#4D7CFF]/20 active:scale-95'} cyber-border`}
                >
                  <RefreshCw className="w-4 h-4 text-[#4D7CFF]" />
                  <span className="text-[#4D7CFF]">Regenerate</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: isConfirmed ? 1 : 1.02 }}
                  onClick={handleConfirm}
                  disabled={isConfirmed}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 
                    ${isConfirmed 
                      ? 'bg-green-600/80 cursor-not-allowed' 
                      : 'bg-[#4D7CFF] hover:bg-[#3D6AE8] active:scale-95'} cyber-border`}
                >
                  <Check className="w-4 h-4 text-white" />
                  <span className="text-white">{isConfirmed ? 'Confirmed' : 'Confirm'}</span>
                </motion.button>
              </div>
            </div>

            <div className="p-4 overflow-x-auto">
              <div className="min-w-[900px]">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="bg-[#4D7CFF]/10 p-4 text-white font-medium border-b border-r border-[#4D7CFF]/20 min-w-[150px] text-center">
                        Time Slot
                      </th>
                      {days.map(day => (
                        <th key={day} className="bg-[#4D7CFF]/10 p-4 text-white font-medium border-b border-r border-[#4D7CFF]/20 min-w-[150px] text-center">
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timeSlots.map((timeSlot, index) => (
                      <tr key={index} className="group">
                        <td className="bg-[#4D7CFF]/5 p-4 text-white border-r border-b border-[#4D7CFF]/20 font-medium text-center">
                          {timeSlot}
                        </td>
                        {days.map(day => (
                          <td key={day} className="p-3 border-r border-b border-[#4D7CFF]/20 group-hover:bg-[#4D7CFF]/5 transition-colors duration-200">
                            {mockSchedule[day][index].subject ? (
                              <motion.div
                                whileHover={{ y: -2 }}
                                className="space-y-2 flex flex-col items-center"
                              >
                                <div className="text-white font-medium">
                                  {mockSchedule[day][index].subject}
                                </div>
                                <div className="text-[#4D7CFF] text-sm">
                                  {mockSchedule[day][index].teacher}
                                </div>
                              </motion.div>
                            ) : (
                              <div className="space-y-2 flex flex-col items-center text-[#4D7CFF]/50">--</div>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default AfterTimetable;