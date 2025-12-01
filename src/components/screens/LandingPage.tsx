import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../contexts/AppContext';
import { translations } from '../translations/translations';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { 
  Heart, 
  Shield, 
  Sparkles, 
  Flower2, 
  Activity, 
  Users,
  Award,
  Globe,
  ChevronRight,
  Star,
  Plus,
  Zap
} from 'lucide-react';
import { ForwardButton3D } from '../ForwardButton3D';
import cervicalAwarenessRibbon from 'figma:asset/19537e5a115e862cbbb4f975a40484fbba1cea8b.png';

interface LandingPageProps {
  onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
  const { language, setUserName, setLanguage } = useApp();
  const t = translations[language];
  const [name, setName] = useState('');
  const [showLanguageSelect, setShowLanguageSelect] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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

  // Floating decorative elements
  const FloatingElement = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 1, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}
      className={`absolute ${className}`}
    >
      {children}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large floating orbs */}
        <motion.div 
          className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-teal-200/30 to-cyan-300/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute top-1/4 -left-20 w-60 h-60 bg-gradient-to-br from-blue-200/30 to-teal-300/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-br from-cyan-200/30 to-blue-300/20 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
        
        {/* Floating medical icons */}
        <FloatingElement delay={0.5} className="top-20 left-1/4">
          <div className="animate-bounce">
            <Heart className="w-8 h-8 text-teal-400/60" />
          </div>
        </FloatingElement>
        
        <FloatingElement delay={1} className="top-1/3 right-1/3">
          <div className="animate-pulse">
            <Shield className="w-6 h-6 text-cyan-400/60" />
          </div>
        </FloatingElement>
        
        <FloatingElement delay={1.5} className="bottom-1/3 left-1/3">
          <div className="animate-spin">
            <Activity className="w-7 h-7 text-blue-400/60" />
          </div>
        </FloatingElement>
        
        <FloatingElement delay={2} className="bottom-20 right-1/4">
          <div className="animate-ping">
            <Flower2 className="w-5 h-5 text-teal-500/60" />
          </div>
        </FloatingElement>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10">
        <div className="flex flex-col items-center min-h-screen">
          
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -50 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center mb-12 pt-8"
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 200 }}
              className="relative mb-6"
            >
              <div className="relative mx-auto w-28 h-28 sm:w-32 sm:h-32 bg-gradient-to-br from-teal-100 via-cyan-50 to-blue-100 dark:from-teal-900/30 dark:via-cyan-900/20 dark:to-blue-900/30 rounded-3xl shadow-2xl flex items-center justify-center animate-glow-pulse p-4">
                <div className="pulse-ring"></div>
                <motion.img 
                  src={cervicalAwarenessRibbon} 
                  alt="Cervical Cancer Awareness - Teal and White Ribbon with Female Reproductive Health Symbol"
                  className="w-full h-full object-contain relative z-10 rounded-2xl animate-ribbon-wave"
                  whileHover={{ scale: 1.05, rotate: 3 }}
                  transition={{ duration: 0.3 }}
                />
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-teal-400 animate-pulse" />
                <Star className="absolute -bottom-1 -left-1 w-4 h-4 text-cyan-300 animate-bounce-gentle" />
                <motion.div
                  className="absolute top-1/4 right-1/4 w-2 h-2 bg-pink-400 rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>
            
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
            >
              <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent">
                Cervi
              </span>
              <span className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent">
                Care
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
            >
              Your Advanced Cervical Health Companion
            </motion.p>
            
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-8 mt-8"
            >
              {[
                { icon: Users, label: "10K+ Users", value: "Trusted" },
                { icon: Award, label: "98% Accuracy", value: "Certified" },
                { icon: Globe, label: "2 Languages", value: "Global" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 glassmorphism-card px-4 py-2"
                >
                  <stat.icon className="w-5 h-5 text-teal-600" />
                  <div className="text-sm">
                    <div className="font-semibold text-gray-800 dark:text-white">{stat.label}</div>
                    <div className="text-gray-600 dark:text-gray-300">{stat.value}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="w-full max-w-xl px-4 sm:px-0"
          >
            <Card className="glassmorphism-card p-6 sm:p-8 lg:p-10 relative overflow-hidden mx-auto">
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="w-full h-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </div>

              {!showLanguageSelect ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8"
                >
                  {/* Welcome Section */}
                  <div className="text-center">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-100 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/30 px-4 py-2 rounded-full mb-4"
                    >
                      <Zap className="w-4 h-4 text-teal-600" />
                      <span className="text-sm font-medium text-teal-800 dark:text-teal-200">Start Your Health Journey</span>
                    </motion.div>
                    
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                      Welcome to Your Health Assistant
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      Let's personalize your experience with cervical health guidance
                    </p>
                  </div>

                  {/* Name Input */}
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-gray-700 dark:text-gray-200 font-medium flex items-center text-sm sm:text-base">
                        <Heart className="w-4 h-4 mr-2 text-teal-600" />
                        What should we call you?
                      </label>
                      <motion.div
                        whileFocus={{ scale: 1.02 }}
                        className="relative group"
                      >
                        <Input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Enter your first name"
                          className="pl-4 pr-16 py-3 sm:py-4 border-2 border-teal-200 dark:border-teal-700 focus:border-teal-400 dark:focus:border-teal-500 bg-white/80 dark:bg-gray-700/80 rounded-xl text-base sm:text-lg transition-all duration-300 group-hover:shadow-lg"
                        />
                        
                        {/* Enhanced Forward Button */}
                        <div className="absolute right-2 top-1/2 -translate-y-1/2">
                          <ForwardButton3D
                            onClick={handleNameSubmit}
                            disabled={!name.trim()}
                            variant="inline"
                            size="md"
                          />
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* Enhanced Main Continue Button */}
                    <motion.div
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative group"
                    >
                      <Button
                        onClick={handleNameSubmit}
                        disabled={!name.trim()}
                        className="w-full medical-3d-button py-4 sm:py-5 text-base sm:text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                      >
                        {/* Background gradient animation */}
                        <div className="absolute inset-0 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <span className="relative z-10 flex items-center justify-center space-x-3">
                          <span>Continue to Health Assessment</span>
                          <motion.div
                            whileHover={{ x: 4, scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center"
                          >
                            <ChevronRight className="w-5 h-5" />
                            <motion.div
                              animate={{ x: [0, 3, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                              className="ml-1"
                            >
                              <ChevronRight className="w-4 h-4 opacity-60" />
                            </motion.div>
                          </motion.div>
                        </span>
                        
                        {/* Floating particles */}
                        <motion.div
                          className="absolute top-2 right-4 w-1 h-1 bg-white/60 rounded-full"
                          animate={{ y: [0, -8, 0], opacity: [0.6, 1, 0.6] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div
                          className="absolute bottom-3 left-6 w-1 h-1 bg-white/40 rounded-full"
                          animate={{ y: [0, -6, 0], opacity: [0.4, 0.8, 0.4] }}
                          transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
                        />
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8"
                >
                  {/* Greeting */}
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center"
                    >
                      <span className="text-2xl">👋</span>
                    </motion.div>
                    
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                      Nice to meet you, {name}!
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      Choose your preferred language for the health assessment
                    </p>
                  </div>

                  {/* Back to Name Input */}
                  <div className="flex justify-start mb-4">
                    <motion.button
                      onClick={() => setShowLanguageSelect(false)}
                      whileHover={{ scale: 1.05, x: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-900/20"
                    >
                      <motion.div
                        whileHover={{ x: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight className="w-4 h-4 rotate-180" />
                      </motion.div>
                      <span className="text-sm font-medium">Back to name</span>
                    </motion.button>
                  </div>

                  {/* 3D Language Buttons */}
                  <div className="space-y-4 sm:space-y-5">
                    <motion.button
                      onClick={() => handleLanguageSelect('en')}
                      whileHover={{ scale: 1.02, y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full language-button-3d p-4 sm:p-5 text-left group relative overflow-hidden"
                    >
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-full h-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                      </div>
                      
                      <div className="relative z-10 flex items-center space-x-4">
                        <div className="w-12 h-12 sm:w-13 sm:h-13 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-lg sm:text-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 flex-shrink-0">
                          🇬🇧
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-gray-800 dark:text-white text-base sm:text-lg mb-1">
                            Continue in English
                          </div>
                          <div className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            Proceed with assessment in English language
                          </div>
                        </div>
                        <div className="flex items-center flex-shrink-0">
                          <motion.div
                            whileHover={{ x: 3, scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                            className="w-8 h-8 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-500 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 rounded-lg flex items-center justify-center opacity-70 group-hover:opacity-100 transition-all duration-300"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </motion.div>
                        </div>
                      </div>
                    </motion.button>
                    
                    <motion.button
                      onClick={() => handleLanguageSelect('hi')}
                      whileHover={{ scale: 1.02, y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full language-button-3d p-4 sm:p-5 text-left group relative overflow-hidden"
                    >
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-full h-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                      </div>
                      
                      <div className="relative z-10 flex items-center space-x-4">
                        <div className="w-12 h-12 sm:w-13 sm:h-13 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-lg sm:text-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 flex-shrink-0">
                          🇮🇳
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-gray-800 dark:text-white text-base sm:text-lg mb-1">
                            हिंदी में जारी रखें
                          </div>
                          <div className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            हिंदी भाषा में स्वास्थ्य मूल्यांकन जारी रखें
                          </div>
                        </div>
                        <div className="flex items-center flex-shrink-0">
                          <motion.div
                            whileHover={{ x: 3, scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                            className="w-8 h-8 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-500 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 rounded-lg flex items-center justify-center opacity-70 group-hover:opacity-100 transition-all duration-300"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </motion.div>
                        </div>
                      </div>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </Card>
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 w-full max-w-5xl px-4 sm:px-0"
          >
            {[
              {
                icon: Shield,
                title: "Safe & Private",
                description: "Your data is encrypted and completely confidential"
              },
              {
                icon: Activity,
                title: "AI-Powered",
                description: "Advanced algorithms for accurate health insights"
              },
              {
                icon: Heart,
                title: "Expert Guidance",
                description: "Developed with healthcare professionals"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glassmorphism-card p-4 sm:p-6 text-center hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl flex items-center justify-center hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="text-center mt-12 text-sm text-gray-500 dark:text-gray-400"
          >
            <p className="flex items-center justify-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>This tool is for educational purposes only. Always consult healthcare professionals for medical advice.</span>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}