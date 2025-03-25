import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

function Footer() {
  return (
    <footer className="glass-effect border-t border-[#4D7CFF]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center mb-4">
              <Clock className="w-8 h-8 text-[#4D7CFF]" />
              <span className="ml-2 text-xl font-bold text-white neon-glow">TimeFourthe</span>
            </div>
            <p className="text-gray-400">
              Quantum-powered scheduling for the next generation.
            </p>
          </motion.div>
          
          {['Product', 'Company', 'Legal'].map((section, index) => (
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-4 text-white">{section}</h3>
              <ul className="space-y-2">
                {['Features', 'About', 'Privacy', 'Templates', 'Blog', 'Terms'].slice(0, 4).map((item, i) => (
                  <motion.li
                    key={item}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="border-t border-[#4D7CFF]/20 mt-12 pt-8 text-center text-gray-400"
        >
          <p>&copy; {new Date().getFullYear()} TimeFourthe. Quantum rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;