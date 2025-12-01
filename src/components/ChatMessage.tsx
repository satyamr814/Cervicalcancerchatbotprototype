import { motion } from 'motion/react';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  delay?: number;
}

export function ChatMessage({ message, isBot, delay = 0 }: ChatMessageProps) {
  return (
    <motion.div
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div
        className={`max-w-[80%] rounded-3xl px-5 py-4 shadow-lg backdrop-blur-sm ${
          isBot
            ? 'bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 text-gray-800 dark:text-pink-100 border border-pink-200/50 dark:border-pink-800/50'
            : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-pink-200/50 dark:shadow-pink-800/30'
        }`}
      >
        <p className="leading-relaxed whitespace-pre-line">{message}</p>
      </div>
    </motion.div>
  );
}