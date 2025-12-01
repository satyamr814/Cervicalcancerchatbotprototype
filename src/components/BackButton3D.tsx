import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

interface BackButton3DProps {
  onClick: () => void;
  text?: string;
  className?: string;
}

export function BackButton3D({ onClick, text = "Back", className = "" }: BackButton3DProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05, x: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`group relative overflow-hidden bg-gradient-to-r from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-700/80 backdrop-blur-lg border-2 border-teal-200/60 dark:border-teal-700/60 hover:border-teal-400/80 dark:hover:border-teal-500/80 rounded-2xl px-4 py-3 shadow-lg hover:shadow-xl transition-all duration-300 text-teal-700 dark:text-teal-300 hover:text-teal-800 dark:hover:text-teal-200 ${className}`}
    >
      {/* 3D depth effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-400/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-full h-full animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      </div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <div className="absolute w-1 h-1 bg-teal-400/60 rounded-full top-2 left-3 opacity-0 group-hover:opacity-100 animate-bounce transition-opacity duration-300 delay-100"></div>
        <div className="absolute w-1 h-1 bg-cyan-400/60 rounded-full bottom-2 right-4 opacity-0 group-hover:opacity-100 animate-bounce transition-opacity duration-300 delay-200"></div>
        <div className="absolute w-0.5 h-0.5 bg-blue-400/60 rounded-full top-1/2 right-2 opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300 delay-150"></div>
      </div>
      
      <div className="relative flex items-center space-x-2 z-10">
        <motion.div
          whileHover={{ x: -2, rotate: -5 }}
          transition={{ duration: 0.2 }}
          className="relative"
        >
          <ArrowLeft className="w-4 h-4" />
          <div className="absolute inset-0 bg-teal-400/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </motion.div>
        <span className="font-medium text-sm sm:text-base">{text}</span>
      </div>
    </motion.button>
  );
}