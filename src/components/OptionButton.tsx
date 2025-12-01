import { motion } from 'motion/react';
import { ChevronRight, Sparkles } from 'lucide-react';
import { ForwardButton3D } from './ForwardButton3D';

interface OptionButtonProps {
  text: string;
  onClick: () => void;
  delay?: number;
  variant?: 'default' | 'secondary';
}

export function OptionButton({ text, onClick, delay = 0, variant = 'default' }: OptionButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`group w-full mb-3 p-4 h-auto text-left relative overflow-hidden transition-all duration-300 ${
        variant === 'default'
          ? 'medical-3d-button border-0 shadow-teal-200/50 dark:shadow-teal-800/30'
          : 'option-button-3d text-gray-700 dark:text-gray-200'
      }`}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-full h-full animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="font-medium text-sm sm:text-base flex-1 pr-2">{text}</span>
        <div className="flex items-center space-x-2 flex-shrink-0">
          {variant === 'default' && (
            <Sparkles className="w-4 h-4 opacity-80 group-hover:opacity-100 transition-opacity" />
          )}
          <ForwardButton3D
            variant="secondary"
            size="sm"
            className="opacity-60 group-hover:opacity-100 transition-opacity duration-300 scale-75"
          />
        </div>
      </div>
      
      {/* Hover glow effect */}
      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
        variant === 'default' 
          ? 'bg-gradient-to-r from-teal-400/10 to-cyan-500/10' 
          : 'bg-gradient-to-r from-teal-300/5 to-cyan-400/5'
      }`}></div>
    </motion.button>
  );
}