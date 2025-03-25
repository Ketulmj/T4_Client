import React from 'react';
import { FolderX, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center relative overflow-hidden hexagon-bg">
      <div className="fixed inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A] pointer-events-none"></div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-3/4 max-w-2xl glass-effect p-12 rounded-2xl backdrop-blur-md shadow-md border border-[#4D7CFF]/20 text-center hover-glow"
      >
        <div className="flex items-center justify-center mb-8">
          <Clock className="w-8 h-8 text-[#4D7CFF]" />
          <span className="ml-2 text-xl font-bold text-white neon-glow">TimeFourthe</span>
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="p-6 rounded-full bg-[#4D7CFF]/10 border border-[#4D7CFF]/20">
            <FolderX className="h-24 w-24 text-[#4D7CFF]" />
          </div>
        </div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-7xl font-bold text-white mb-4 tracking-tighter drop-shadow-lg"
        >
          404
        </motion.h1>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-2xl text-gray-400 mb-6 font-light"
        >
          Quantum Anomaly Detected
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-400 text-lg mb-10 max-w-lg mx-auto"
        >
          The timeline you're searching for seems to have collapsed into the quantum void.
        </motion.p>
        
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="inline-flex items-center px-8 py-3 rounded-xl bg-[#4D7CFF] hover:bg-[#3D6AE8] text-white font-medium transition-all duration-200 cyber-border hover-glow"
          >
            Return to Main Timeline
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}

export default NotFound;