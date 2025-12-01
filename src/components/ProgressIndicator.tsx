import { motion } from 'motion/react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between mb-3">
        <span className="text-sm text-pink-600 dark:text-pink-400 font-medium">Progress</span>
        <span className="text-sm text-pink-600 dark:text-pink-400 font-medium">{currentStep}/{totalSteps}</span>
      </div>
      <div className="w-full bg-pink-100 dark:bg-pink-900/30 rounded-full h-3 shadow-inner">
        <motion.div
          className="bg-gradient-to-r from-pink-500 to-purple-600 h-3 rounded-full shadow-lg relative overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
        </motion.div>
      </div>
    </div>
  );
}