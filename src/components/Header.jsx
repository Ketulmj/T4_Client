import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed w-full glass-effect z-50 border-b border-[#4D7CFF]/20"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center"
        >
          <Clock className="w-8 h-8 text-[#4D7CFF]" />
          <span className="ml-2 text-xl font-bold text-white">TimeFourthe</span>
        </motion.div>
        
        <div className="hidden md:flex items-center space-x-8">
          {['Features', 'Templates', 'Pricing'].map((item, index) => (
            <Link
              key={item}
              to={`/${item}`}
              whileHover={{ scale: 1.1 }}
              className="text-gray-300 hover:text-white transition-colors duration-200"
              // initial={{ opacity: 0, y: -20 }}
              // animate={{ opacity: 1, y: 0 }}
              // transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {item}
            </Link>
          ))}
        </div>
        
        <div className="flex items-center space-x-4">
          <Link to='/login'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="text-gray-300 hover:text-white transition-colors duration-200"
          >
            Login
          </motion.button>
          </Link>
          <Link to='/signup'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="cyber-border bg-[#4D7CFF] hover:bg-[#3D6AE8] px-4 py-2 rounded-lg transition-all duration-200 text-white hover-glow"
          >
            Get Started
          </motion.button>
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}

export default Header;