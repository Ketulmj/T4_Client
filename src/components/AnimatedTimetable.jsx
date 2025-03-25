import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const subjects = [
  { name: 'Math', color: 'from-blue-500/30 to-purple-500/30' },
  { name: 'Biology', color: 'from-green-500/30 to-teal-500/30' },
  { name: 'Chemistry', color: 'from-purple-500/30 to-pink-500/30' },
  { name: 'Physics', color: 'from-blue-500/30 to-cyan-500/30' },
  { name: 'History', color: 'from-amber-500/30 to-orange-500/30' },
  { name: 'English', color: 'from-indigo-500/30 to-blue-500/30' },
  { name: 'Art', color: 'from-pink-500/30 to-rose-500/30' },
  { name: 'Music', color: 'from-violet-500/30 to-purple-500/30' }
];

const timeSlots = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
const days = ['MON', 'TUE', 'WED', 'THU', 'FRI','SAT'];

const fixedSchedule = {
  'THU-9:00': { name: 'English', color: 'from-violet-500/30 to-purple-500/30' },
  'WED-11:00': { name: 'Biology', color: 'from-green-500/30 to-teal-500/30' },
  'WED-12:00': { name: 'Chemistry', color: 'from-purple-500/30 to-pink-500/30' },
  'WED-13:00': { name: 'Math', color: 'from-blue-500/30 to-purple-500/30' },
  'THU-13:00': { name: 'Music', color: 'from-violet-500/30 to-purple-500/30' },
  'MON-14:00': { name: 'Biology', color: 'from-green-500/30 to-teal-500/30' },
  'FRI-14:00': { name: 'History', color: 'from-amber-500/30 to-orange-500/30' },
  'WED-16:00': { name: 'Math', color: 'from-blue-500/30 to-purple-500/30' },
  'FRI-16:00': { name: 'Art', color: 'from-pink-500/30 to-rose-500/30' },
  'SAT-10:00': { name: 'Geography', color: 'from-pink-500/30 to-rose-500/30' }
};

function AnimatedTimetable() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const [hasScrolled, setHasScrolled] = useState(false);
  const [disperse, setDisperse] = useState(false);
  const [hoveredCell, setHoveredCell] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(true);
      const scrollPosition = window.scrollY;
      const disperseThreshold = 300;
      setDisperse(scrollPosition > disperseThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const generateRandomPosition = () => {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 1500;
    const rotateX = (Math.random() - 0.5) * 1080;
    const rotateY = (Math.random() - 0.5) * 1080;
    const rotateZ = (Math.random() - 0.5) * 1080;
    return { x, y, z, rotateX, rotateY, rotateZ };
  };

  return (
    <div ref={ref} className="max-w-4xl mx-auto px-4 perspective-1000">
      <div className="grid grid-cols-7 gap-[2px] rounded-xl overflow-hidden shadow-2xl transform-style-3d bg-[#0A0A1A] p-2 holographic-bg grid-lines">
        {/* Empty top-left cell */}
        <div className="glass-effect rounded-lg p-2 text-xs"></div>
        
        {/* Days header */}
        {days.map(day => (
          <div key={day} className="glass-effect rounded-lg text-center font-semibold p-2 text-xs holographic-text">
            {day}
          </div>
        ))}
        
        {/* Time slots and cells */}
        {timeSlots.map(time => (
          <React.Fragment key={time}>
            {/* Time slot */}
            <div className="glass-effect rounded-lg text-center pr-2 p-2 text-xs font-medium holographic-text items-center flex justify-center">
              {time}
            </div>
            
            {/* Day cells */}
            {days.map(day => {
              const cellKey = `${day}-${time}`;
              const event = fixedSchedule[cellKey];
              const randomPosition = generateRandomPosition();
              const isHovered = hoveredCell === cellKey;
              
              return (
                <div key={cellKey} className="relative min-h-[40px]">
                  <AnimatePresence>
                    {inView && event && (
                      <motion.div
                        initial={hasScrolled ? {
                          scale: 0,
                          x: randomPosition.x,
                          y: randomPosition.y,
                          z: randomPosition.z,
                          rotateX: randomPosition.rotateX,
                          rotateY: randomPosition.rotateY,
                          rotateZ: randomPosition.rotateZ,
                          opacity: 0
                        } : {
                          scale: 0,
                          opacity: 0
                        }}
                        animate={{
                          scale: 1,
                          x: 0,
                          y: 0,
                          z: isHovered ? 50 : 0,
                          rotateX: 0,
                          rotateY: isHovered ? 15 : 0,
                          rotateZ: 0,
                          opacity: 1
                        }}
                        exit={disperse ? {
                          scale: 0,
                          x: randomPosition.x,
                          y: randomPosition.y,
                          z: randomPosition.z,
                          rotateX: randomPosition.rotateX,
                          rotateY: randomPosition.rotateY,
                          rotateZ: randomPosition.rotateZ,
                          opacity: 0
                        } : {
                          scale: 0,
                          opacity: 0
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 80,
                          damping: 12,
                          duration: 1.5,
                          delay: Math.random() * 0.4
                        }}
                        onHoverStart={() => setHoveredCell(cellKey)}
                        onHoverEnd={() => setHoveredCell(null)}
                        className={`absolute inset-0 m-0.5 rounded-lg flex items-center justify-center text-xs font-medium transform-style-3d holographic-cell bg-gradient-to-br ${event.color}`}
                        style={{
                          transformStyle: "preserve-3d"
                        }}
                      >
                        <div className="relative z-10 holographic-text font-semibold">
                          {event.name}
                        </div>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 bg-gradient-to-br from-[rgba(77,124,255,0.2)] to-[rgba(123,77,255,0.2)] rounded-lg"
                            style={{
                              filter: "blur(8px)",
                              zIndex: 0
                            }}
                          />
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default AnimatedTimetable;