import React from 'react';
import { FolderX, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import logo from '../../public/logo.png'

function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center relative overflow-hidden hexagon-bg">
      <Helmet>
              <title>Not Found | TimeFourthe</title>
            <link rel="icon" type="image/png" href={logo} />
            </Helmet>
      <div className="fixed inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A] pointer-events-none"></div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-3/4 max-w-2xl glass-effect p-12 rounded-2xl backdrop-blur-md shadow-md border border-[#4D7CFF]/20 text-center hover-glow"
      >
        
            <img src={logo  } className="h-15 w-15 mx-auto mb-6" />
        
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-2xl text-gray-400 mb-6 font-light"
        >
          Page is not initialized, Yet
        </motion.h2>
        

        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="inline-flex items-center px-8 py-3 rounded-xl bg-[#4D7CFF] hover:bg-[#3D6AE8] text-white font-medium transition-all duration-200 cursor-pointer"
          >
            Return to Main Timeline
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}

export default NotFound;