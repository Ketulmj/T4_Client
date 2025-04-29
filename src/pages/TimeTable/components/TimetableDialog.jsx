import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCcw, Check, Edit, Edit2, Edit3, X, ArrowRight } from 'lucide-react';
import TimetableGrid from './TimetableGrid';

const TimetableDialog = ({
  timetableData,
  isOpen,
  onClose,
  onConfirm,
  onRegenerate,
  footer,
  cross,
  setIsLoading,
  isLoading
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
          className={`${footer && 'fixed inset-0 z-50'} flex items-center justify-start p-4 bg-black/90 backdrop-blur-sm w-full glass-effect`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-black rounded-xl shadow-2xl max-w-[100vw] w-full max-h-[90vh] overflow-hidden flex flex-col border border-white/10 glass-effect"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative p-6 border-b border-white/10 glass-effect">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  {cross && (
                    <X
                      size={32}
                      className="text-white absolute top-2 left-2 cursor-pointer z-50"
                      onClick={onClose}
                    />
                  )}
                  <h2 className={`text-2xl font-bold text-white ${cross && 'ml-7'}`}>
                    {timetableData.class}
                  </h2>
                  <p className={`text-white/60 ${cross && 'ml-7'}`}>Academic Year {timetableData.year}</p>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <div className="bg-zinc-900 text-white px-3 py-1 rounded-full border border-white/10">
                    Period: {timetableData.periodDuration} mins
                  </div>
                  <div className="bg-zinc-900 text-white px-3 py-1 rounded-full border border-white/10">
                    Lab: {timetableData.labDuration} mins
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
            <div className="flex-1 overflow-auto p-6 bg-black glass-effect">
              <TimetableGrid
                timetable={timetableData.timetable}
                breakStartTime={timetableData.breakStartTime}
                breakDuration={timetableData.breakDuration}
                periodDuration={timetableData.periodDuration}
                labDuration={timetableData.labDuration}
              />
            </div>

            {
              footer &&
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

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  onClick={onConfirm}
                  className={`bg-white px-5 py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center group cursor-pointer font-medium ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Generating ...
                    </div>
                  ) : (
                    <>
                      Confirm
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>
              </div>
            }
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TimetableDialog;