import React, { useState } from 'react';
import { RefreshCw, Check, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from "react-helmet-async";
import Navbar from '../../components/Navbar';
import logo from '../../public/logo.png';

import ShowTimeTable from '../../components/showTimeTable';

const timetableData = {
  "generatedTimeTable": [
    [
      {
        "startTime": 500,
        "subject": {
          "name": "History",
          "isLab": false,
          "teacher": {
            "name": "Emily Davis",
            "teacherId": "TCH1005"
          }
        },
        "isLab": false
      },
      {
        "startTime": 590,
        "subject": {
          "name": "Math",
          "isLab": true,
          "teacher": {
            "name": "John Doe",
            "teacherId": "TCH1001"
          }
        },
        "isLab": false
      },
      {
        "startTime": 650,
        "subject": {
          "name": "Biology",
          "isLab": true,
          "teacher": {
            "name": "Sarah Lee",
            "teacherId": "TCH1004"
          }
        },
        "isLab": false
      },
      {
        "startTime": 710,
        "subject": {
          "name": "Chemistry",
          "isLab": false,
          "teacher": {
            "name": "Mike Johnson",
            "teacherId": "TCH1003"
          }
        },
        "isLab": false
      }
    ],
    [
      {
        "startTime": 500,
        "subject": {
          "name": "Physics",
          "isLab": false,
          "teacher": {
            "name": "Jane Smith",
            "teacherId": "TCH1002"
          }
        },
        "isLab": false
      },
      {
        "startTime": 590,
        "subject": {
          "name": "Chemistry",
          "isLab": false,
          "teacher": {
            "name": "Mike Johnson",
            "teacherId": "TCH1003"
          }
        },
        "isLab": false
      },
      {
        "startTime": 680,
        "subject": {
          "name": "Biology",
          "isLab": true,
          "teacher": {
            "name": "Sarah Lee",
            "teacherId": "TCH1004"
          }
        },
        "isLab": false
      }
    ],
    [
      {
        "startTime": 500,
        "subject": {
          "name": "History",
          "isLab": false,
          "teacher": {
            "name": "Emily Davis",
            "teacherId": "TCH1005"
          }
        },
        "isLab": false
      },
      {
        "startTime": 590,
        "subject": {
          "name": "Math",
          "isLab": true,
          "teacher": {
            "name": "John Doe",
            "teacherId": "TCH1001"
          }
        },
        "isLab": false
      },
      {
        "startTime": 650,
        "subject": {
          "name": "Chemistry",
          "isLab": false,
          "teacher": {
            "name": "Mike Johnson",
            "teacherId": "TCH1003"
          }
        },
        "isLab": false
      },
      {
        "startTime": 740,
        "subject": {
          "name": "Biology",
          "isLab": true,
          "teacher": {
            "name": "Sarah Lee",
            "teacherId": "TCH1004"
          }
        },
        "isLab": false
      }
    ],
    [
      {
        "startTime": 500,
        "subject": {
          "name": "History",
          "isLab": false,
          "teacher": {
            "name": "Emily Davis",
            "teacherId": "TCH1005"
          }
        },
        "isLab": false
      },
      {
        "startTime": 590,
        "subject": {
          "name": "Physics",
          "isLab": false,
          "teacher": {
            "name": "Jane Smith",
            "teacherId": "TCH1002"
          }
        },
        "isLab": false
      },
      {
        "startTime": 680,
        "subject": {
          "name": "Biology",
          "isLab": true,
          "teacher": {
            "name": "Sarah Lee",
            "teacherId": "TCH1004"
          }
        },
        "isLab": false
      },
      {
        "startTime": 740,
        "subject": {
          "name": "Math",
          "isLab": true,
          "teacher": {
            "name": "John Doe",
            "teacherId": "TCH1001"
          }
        },
        "isLab": false
      }
    ],
    [
      {
        "startTime": 500,
        "subject": {
          "name": "History",
          "isLab": false,
          "teacher": {
            "name": "Emily Davis",
            "teacherId": "TCH1005"
          }
        },
        "isLab": false
      },
      {
        "startTime": 590,
        "subject": {
          "name": "Physics",
          "isLab": false,
          "teacher": {
            "name": "Jane Smith",
            "teacherId": "TCH1002"
          }
        },
        "isLab": false
      },
      {
        "startTime": 680,
        "subject": {
          "name": "Chemistry",
          "isLab": false,
          "teacher": {
            "name": "Mike Johnson",
            "teacherId": "TCH1003"
          }
        },
        "isLab": false
      },
      {
        "startTime": 770,
        "subject": {
          "name": "Biology",
          "isLab": true,
          "teacher": {
            "name": "Sarah Lee",
            "teacherId": "TCH1004"
          }
        },
        "isLab": false
      }
    ],
    [
      {
        "startTime": 500,
        "subject": {
          "name": "Math",
          "isLab": true,
          "teacher": {
            "name": "John Doe",
            "teacherId": "TCH1001"
          }
        },
        "isLab": false
      },
      {
        "startTime": 560,
        "subject": {
          "name": "History",
          "isLab": false,
          "teacher": {
            "name": "Emily Davis",
            "teacherId": "TCH1005"
          }
        },
        "isLab": false
      },
      {
        "startTime": 650,
        "subject": {
          "name": "Physics",
          "isLab": false,
          "teacher": {
            "name": "Jane Smith",
            "teacherId": "TCH1002"
          }
        },
        "isLab": false
      },
      {
        "startTime": 740,
        "subject": {
          "name": "Chemistry",
          "isLab": false,
          "teacher": {
            "name": "Mike Johnson",
            "teacherId": "TCH1003"
          }
        },
        "isLab": false
      }
    ]
  ]
};

const AfterTimetable = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { generatedTimeTable } = timetableData;

    const getAllTimeSlots = () => {
      const allTimes = new Set();
      generatedTimeTable.forEach(day => {
        day.forEach(slot => {
          allTimes.add(slot.startTime);
        });
      });
      return [...allTimes].sort((a, b) => a - b);
    };

  const timeSlots = getAllTimeSlots();
  
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const handleRegenerate = () => {
    setIsConfirmed(false);
  };

  const handleConfirm = () => {
    setIsConfirmed(true);
  };

  const findClassForTimeSlot = (dayIndex, timeSlot) => {
    const daySchedule = generatedTimeTable[dayIndex] || [];
    return daySchedule.find(slot => slot.startTime === timeSlot) || null;
  };

  return (
    <>
      <Helmet>
        <title>TimeTable | Time Fourthe</title>
        <link rel="icon" type="image/png" href={logo} />
      </Helmet>
      <Navbar role={'organization'}/>
      <div className="h-[calc(100vh-64px)] bg-[#0A0A0A] p-3 relative overflow-hidden hexagon-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="h-full mx-auto relative z-10"
        >
          <div className="h-full glass-effect rounded-xl overflow-hidden backdrop-blur-md border border-[#4D7CFF]/20 shadow-md hover-glow flex flex-col">
            <div className="p-3 border-b border-[#4D7CFF]/20 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-[#4D7CFF]" />
                <h1 className="text-lg font-bold text-white neon-glow">Class X - A Weekly Schedule</h1>
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: isConfirmed ? 1 : 1.02 }}
                  onClick={handleRegenerate}
                  disabled={isConfirmed}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-medium transition-all duration-300 
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
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-medium transition-all duration-300 
                    ${isConfirmed 
                      ? 'bg-green-600/80 cursor-not-allowed' 
                      : 'bg-[#4D7CFF] hover:bg-[#3D6AE8] active:scale-95'} cyber-border`}
                >
                  <Check className="w-4 h-4 text-white" />
                  <span className="text-white">{isConfirmed ? 'Confirmed' : 'Confirm'}</span>
                </motion.button>
              </div>
            </div>

            <div className="flex-1 p-2 overflow-auto">
              <ShowTimeTable timetable={timetableData.generatedTimeTable}/>
              {/* <table className="w-full border-collapse">
                <thead className="sticky top-0 bg-[#0A0A0A] z-10">
                  <tr>
                    <th className="bg-[#4D7CFF]/10 p-2 text-white font-medium border-b border-r border-[#4D7CFF]/20 min-w-[120px] text-center">
                      Time Slot
                    </th>
                    {days.map((day, index) => (
                      <th key={day} className="bg-[#4D7CFF]/10 p-2 text-white font-medium border-b border-r border-[#4D7CFF]/20 min-w-[120px] text-center">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((timeSlot) => (
                    <tr key={timeSlot} className="group">
                      <td className="bg-[#4D7CFF]/5 p-2 text-white border-r border-b border-[#4D7CFF]/20 font-medium text-center text-sm">
                        {minutesToTimeString(timeSlot)}
                      </td>
                      {days.map((day, dayIndex) => {
                        const classInfo = findClassForTimeSlot(dayIndex, timeSlot);
                        
                        return (
                          <td key={`${day}-${timeSlot}`} className="p-2 border-r border-b border-[#4D7CFF]/20 group-hover:bg-[#4D7CFF]/5 transition-colors duration-200">
                            {classInfo ? (
                              <motion.div 
                                whileHover={{ y: -2 }}
                                className={`space-y-1 flex flex-col items-center relative ${
                                  classInfo.subject.isLab ? 'lab-subject' : ''
                                }`}
                              >
                                <div className="flex items-center gap-1">
                                  <div className="text-white font-medium flex items-center gap-1 text-sm">
                                    {classInfo.subject.name}
                                    {classInfo.subject.isLab && (
                                      <span className="text-xs bg-[#4D7CFF]/20 rounded-full text-[#4D7CFF]">
                                        Lab
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="text-[#4D7CFF] text-xs">
                                  {classInfo.subject.teacher.name}
                                </div>
                              </motion.div>
                            ) : (
                              <div className="space-y-1 flex flex-col items-center text-[#4D7CFF]/50">--</div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table> */}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default AfterTimetable;