import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const ConfirmationDialog = ({ onClose, onConfirm, message }) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="glass-effect rounded-xl p-6 max-w-md w-[90%] border border-[#4D7CFF]/20 shadow-lg hover-glow"
      >
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="h-6 w-6 text-[#4D7CFF]" />
          <h3 className="text-lg font-bold text-white neon-glow">Confirm Action</h3>
        </div>
        <p className="text-white/80 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-medium bg-[#4D7CFF]/10 text-[#4D7CFF] hover:bg-[#4D7CFF]/20 transition-all duration-200"
          >
            No
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl text-sm font-medium bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-all duration-200"
          >
            Yes
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmationDialog;