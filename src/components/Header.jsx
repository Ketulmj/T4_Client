import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../public/logo.png'

function Header() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed w-full z-50 backdrop-blur-xs transition-all duration-300"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center"
        >
          <img src={logo} className='w-8 h-8 mt-0.5' />
          <span className="ml-2 text-xl font-bold text-white">TimeFourthe</span>
        </motion.div>

        <div className="flex items-center space-x-4">
          <Link to='/login'>
            <button
              class="cursor-pointer group relative bg-white hover:bg-zinc-300 text-black font-semibold text-sm px-6 py-3 rounded-full transition-all duration-200 ease-in-out shadow hover:shadow-lg"
            >
              <div class="relative flex items-center justify-center gap-2">
                <span class="relative inline-block overflow-hidden">
                  <span
                    class="block transition-transform duration-300 group-hover:-translate-y-full"
                  >
                    Get Started
                  </span>
                  <span
                    class="absolute inset-0 transition-transform duration-300 translate-y-full group-hover:translate-y-0"
                  >
                    Right Now
                  </span>
                </span>

                <svg
                  class="w-4 h-4 transition-transform duration-200 group-hover:rotate-45"
                  viewBox="0 0 24 24"
                >
                  <circle fill="currentColor" r="11" cy="12" cx="12"></circle>
                  <path
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-width="2"
                    stroke="white"
                    d="M7.5 16.5L16.5 7.5M16.5 7.5H10.5M16.5 7.5V13.5"
                  ></path>
                </svg>
              </div>
            </button>

          </Link>
        </div>
      </nav>
    </motion.header>
  );
}

export default Header;