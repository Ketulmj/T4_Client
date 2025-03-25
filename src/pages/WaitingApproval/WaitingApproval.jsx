import React from 'react';
import { Clock, Mail, ArrowRight } from 'lucide-react';
import { Helmet } from "react-helmet-async";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../Login/glow.css';

const WaitingApproval = () => {
  return (
    <>
      <Helmet>
        <title>Waiting Approval | TimeFourthe</title>
        <link rel="icon" type="image/png" href="/home-icon.png" />
      </Helmet>
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4 relative overflow-hidden hexagon-bg">
        <div className="fixed inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A] pointer-events-none"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-[75vw] w-full space-y-8 glass-effect p-8 rounded-2xl backdrop-blur-md border border-[#4D7CFF]/20 shadow-md relative z-10 hover-glow"
        >
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <Clock className="w-8 h-8 text-[#4D7CFF]" />
              <span className="ml-2 text-xl font-bold text-white neon-glow">TimeFourthe</span>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center mb-6"
            >
              <div className="p-4 rounded-full bg-[#4D7CFF]/10 border border-[#4D7CFF]/20">
                <Clock className="h-12 w-12 text-[#4D7CFF] animate-pulse" />
              </div>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl font-bold text-white mb-4 tracking-wide drop-shadow-lg"
            >
              Quantum Verification in Progress
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-gray-400 text-lg mb-8 mx-auto leading-relaxed"
            >
              <div>Your account is awaiting quantum verification from TimeFourthe administrators</div>
              <div>Please monitor your quantum communications channel (email) for further instructions</div>
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center justify-center space-x-2 text-[#4D7CFF]/70 mb-8"
            >
              <Mail className="h-5 w-5" />
              <span className="text-gray-300">Quantum transmission pending</span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-4"
            >
              <p className="text-gray-400 text-sm">
                Upon verification, you'll receive a quantum-encrypted access code via email.
              </p>
              <Link 
                to="/login"
                className="inline-flex items-center text-[#4D7CFF] hover:text-[#3D6AE8] transition-all duration-200 group font-medium"
              >
                Return to quantum portal
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default WaitingApproval;