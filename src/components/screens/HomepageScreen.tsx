import { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../contexts/AppContext';
import { translations } from '../translations/translations';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Heart, Flower2, Star, Sparkles } from 'lucide-react';

interface HomepageScreenProps {
  onStart: () => void;
}

export function HomepageScreen({ onStart }: HomepageScreenProps) {
  const { language, setUserName, setLanguage } = useApp();
  const t = translations[language];
  const [name, setName] = useState('');
  const [showLanguageSelect, setShowLanguageSelect] = useState(false);

  const handleNameSubmit = () => {
    if (name.trim()) {
      setUserName(name.trim());
      setShowLanguageSelect(true);
    }
  };

  const handleLanguageSelect = (lang: 'en' | 'hi') => {
    setLanguage(lang);
    onStart();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNameSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-rose-900/20 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-pink-200 dark:border-pink-800 shadow-2xl">
          {/* Header with decorative elements */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex items-center justify-center mb-4 relative"
            >
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
              </div>
              <div className="absolute -bottom-1 -left-1">
                <Star className="w-3 h-3 text-purple-400 animate-pulse" />
              </div>
              <div className="bg-gradient-to-r from-pink-400 to-purple-500 p-4 rounded-full">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -left-3">
                <Flower2 className="w-5 h-5 text-rose-400 animate-bounce" />
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 bg-clip-text text-transparent text-3xl mb-2"
            >
              {t.homeTitle}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-gray-600 dark:text-gray-300 text-sm"
            >
              {t.homeSubtitle}
            </motion.p>
          </div>

          {!showLanguageSelect ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <label className="text-gray-700 dark:text-gray-200 block text-sm">
                  {t.nameLabel}
                </label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t.namePlaceholder}
                  className="border-pink-200 dark:border-pink-700 focus:border-pink-400 dark:focus:border-pink-500 bg-white/50 dark:bg-gray-700/50"
                />
              </div>
              
              <Button
                onClick={handleNameSubmit}
                disabled={!name.trim()}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Heart className="w-4 h-4 mr-2" />
                {t.continueButton}
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="text-center">
                <p className="text-gray-700 dark:text-gray-200 mb-4">
                  {t.languagePrompt}
                </p>
              </div>
              
              <div className="space-y-3">
                <Button
                  onClick={() => handleLanguageSelect('en')}
                  variant="outline"
                  className="w-full border-pink-200 dark:border-pink-700 hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:border-pink-400 transition-all duration-300 transform hover:scale-105"
                >
                  🇬🇧 {t.englishButton}
                </Button>
                
                <Button
                  onClick={() => handleLanguageSelect('hi')}
                  variant="outline"
                  className="w-full border-purple-200 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-400 transition-all duration-300 transform hover:scale-105"
                >
                  🇮🇳 {t.hindiButton}
                </Button>
              </div>
            </motion.div>
          )}

          {/* Decorative footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex justify-center mt-8 space-x-2"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -5, 0],
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
                className="w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full"
              />
            ))}
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}