import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCcw, Check, Edit, Edit2, Edit3 } from 'lucide-react';
import TimetableGrid from './TimetableGrid';

const TimetableDialog = ({
  timetableData,
  isOpen,
  onClose,
  onConfirm,
  onRegenerate
}) => {
  useEffect(() => {
    if (isOpen) {
      // Prevent scrolling when dialog is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!timetableData) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-black rounded-xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-white/10"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {timetableData.class} - {timetableData.division}
                  </h2>
                  <p className="text-white/60">Academic Year {timetableData.year}</p>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <div className="bg-zinc-900 text-white px-3 py-1 rounded-full border border-white/10">
                    Period: {timetableData.periodDuration} mins
                  </div>
                  <div className="bg-zinc-900 text-white px-3 py-1 rounded-full border border-white/10">
                    Lab: {timetableData.labDuration * 60} mins
                  </div>
                  {timetableData.breakDuration > 0 && (
                    <div className="bg-zinc-900 text-white px-3 py-1 rounded-full border border-white/10">
                      Break: {timetableData.breakDuration} mins
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Timetable content */}
            <div className="flex-1 overflow-auto p-6 bg-black">
              <TimetableGrid
                timetable={timetableData.timetable}
                breakStartTime={timetableData.breakStartTime}
                breakDuration={timetableData.breakDuration}
                periodDuration={timetableData.periodDuration}
                labDuration={timetableData.labDuration}
              />
            </div>

            {/* Footer with buttons */}
            <div className="p-6 border-t border-white/10 flex flex-col sm:flex-row justify-end gap-3 bg-black">
              <button
                onClick={onClose}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-zinc-900 border border-white/10 rounded-lg text-white font-medium hover:bg-zinc-800 transition-colors"
              >
                <Edit3 size={18} />
                Modify
              </button>
              <button
                onClick={onRegenerate}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-zinc-900 border border-white/10 rounded-lg text-white font-medium hover:bg-zinc-800 transition-colors"
              >
                <RefreshCcw size={18} />
                Regenerate
              </button>

              <button
                onClick={onConfirm}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-black rounded-lg font-medium hover:bg-zinc-200 transition-colors"
              >
                <Check size={18} />
                Confirm
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TimetableDialog;