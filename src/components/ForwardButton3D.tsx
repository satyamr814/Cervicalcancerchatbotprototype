import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

interface ForwardButton3DProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'inline';
  children?: React.ReactNode;
}

export const ForwardButton3D: React.FC<ForwardButton3DProps> = ({
  onClick,
  disabled = false,
  className = "",
  size = 'md',
  variant = 'primary',
  children
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'p-2 w-8 h-8';
      case 'lg':
        return 'p-4 w-14 h-14';
      default:
        return 'p-2.5 w-10 h-10';
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-500 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500';
      case 'inline':
        return 'bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white border-2 border-teal-200 dark:border-teal-700 hover:border-teal-400 dark:hover:border-teal-500';
      default:
        return 'bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 disabled:from-gray-300 disabled:to-gray-400 disabled:opacity-50 text-white border-2 border-teal-200 dark:border-teal-700 hover:border-teal-400 dark:hover:border-teal-500';
    }
  };

  if (variant === 'inline') {
    return (
      <motion.button
        whileHover={{ scale: 1.1, x: 3 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
        disabled={disabled}
        className={`relative overflow-hidden ${getSizeClasses()} ${getVariantClasses()} rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl group ${className}`}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-sm"></div>
        
        <motion.div
          whileHover={{ x: 2 }}
          transition={{ duration: 0.2 }}
          className="relative z-10"
        >
          <ChevronRight className="w-4 h-4" />
        </motion.div>
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-full h-full animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        </div>
      </motion.button>
    );
  }

  return (
    <motion.button
      whileHover={{ 
        scale: 1.05, 
        y: -2,
        boxShadow: "0 10px 30px rgba(45, 212, 191, 0.3)"
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative overflow-hidden group
        ${getSizeClasses()}
        ${getVariantClasses()}
        rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl
        disabled:opacity-50 disabled:cursor-not-allowed
        before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent 
        before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
        ${className}
      `}
    >
      {/* Background gradient animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl"></div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center">
        {children ? children : (
          <motion.div
            whileHover={{ x: 2, scale: 1.1 }}
            transition={{ duration: 0.2 }}
            className="flex items-center"
          >
            <ChevronRight className={`${size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-6 h-6' : 'w-4 h-4'}`} />
            <motion.div
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="ml-0.5"
            >
              <ChevronRight className={`${size === 'sm' ? 'w-2.5 h-2.5' : size === 'lg' ? 'w-5 h-5' : 'w-3 h-3'} opacity-60`} />
            </motion.div>
          </motion.div>
        )}
      </div>
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-full h-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>
      
      {/* Floating particles */}
      <motion.div
        className="absolute top-1 right-2 w-0.5 h-0.5 bg-white/60 rounded-full"
        animate={{ y: [0, -4, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
      />
      <motion.div
        className="absolute bottom-1 left-2 w-0.5 h-0.5 bg-white/40 rounded-full"
        animate={{ y: [0, -3, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
      />
    </motion.button>
  );
};

export default ForwardButton3D;