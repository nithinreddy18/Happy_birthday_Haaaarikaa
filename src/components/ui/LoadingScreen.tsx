import React from 'react';
import { motion } from 'framer-motion';

export const LoadingScreen: React.FC = () => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-white dark:bg-black z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    >
      {/* Simple blooming flower using CSS animation */}
      <div className="w-32 h-32 bg-pinkPrimary rounded-full animate-bounce" />
    </motion.div>
  );
};
