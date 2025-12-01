import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LandingPage } from './components/screens/LandingPage';
import { WelcomeScreen } from './components/screens/WelcomeScreen';
import { QuestionScreen } from './components/screens/QuestionScreen';
import { SymptomsQuestionScreen } from './components/screens/SymptomsQuestionScreen';
import { HPVQuestionScreen } from './components/screens/HPVQuestionScreen';
import { ConclusionScreen } from './components/screens/ConclusionScreen';
import { PreventiveTipsScreen } from './components/screens/PreventiveTipsScreen';
import { ProgressIndicator } from './components/ProgressIndicator';
import { ThemeToggle } from './components/ThemeToggle';
import { LanguageToggle } from './components/LanguageToggle';
import { BackButton3D } from './components/BackButton3D';
import { ForwardButton3D } from './components/ForwardButton3D';
import { AppProvider, useApp } from './components/contexts/AppContext';
import { translations } from './components/translations/translations';
import { Heart, Activity, Sparkles } from 'lucide-react';
import { CerviCareLogo } from './components/CerviCareLogo';
import cervicalAwarenessRibbon from 'figma:asset/19537e5a115e862cbbb4f975a40484fbba1cea8b.png';

function AppContent() {
  const { language, userName } = useApp();
  const t = translations[language];
  const [currentStep, setCurrentStep] = useState(-1); // Start with homepage
  const [responses, setResponses] = useState<Record<string, string>>({});

  const questions = [
    {
      id: 'age',
      question: t.questions.age,
      options: ['below20', '20-30', '31-40', 'above40']
    },
    {
      id: 'smoking',
      question: t.questions.smoking,
      options: ['yes', 'no']
    },
    {
      id: 'firstIntercourse',
      question: t.questions.firstIntercourse,
      options: ['never', 'below18', '18-25', '26-35', 'above35']
    },
    {
      id: 'pregnancy',
      question: t.questions.pregnancy,
      options: ['0', '1-2', '3-4', '5orMore']
    },
    {
      id: 'sexualPartners',
      question: t.questions.sexualPartners,
      options: ['1', '2-3', '4-5', 'moreThan5']
    },
    {
      id: 'contraception',
      question: t.questions.contraception,
      options: ['yesContraception', 'noContraception']
    },
    {
      id: 'iud',
      question: t.questions.iud,
      options: ['yesIUD', 'noIUD']
    },
    {
      id: 'stds',
      question: t.questions.stds,
      options: ['yesSTDs', 'noSTDs']
    },
    {
      id: 'symptoms',
      question: t.questions.symptoms,
      options: ['abnormalBleeding', 'unusualDischarge', 'pelvicPain', 'painDuringIntercourse', 'noSymptoms'],
      isMultiSelect: true
    },
    {
      id: 'familyHistory',
      question: t.questions.familyHistory,
      options: ['yesFamilyHistory', 'noFamilyHistory']
    },
    {
      id: 'hpvVaccination',
      question: t.questions.hpvVaccination,
      options: ['yesVaccinated', 'noVaccinated', 'notSure'],
      isSpecial: true
    },
    {
      id: 'vaccinationStrategy',
      question: t.questions.vaccinationStrategy,
      options: ['yesStrategy', 'noStrategy']
    }
  ];

  const totalSteps = questions.length + 4; // questions + homepage + welcome + conclusion + tips

  const handleAnswer = (answer: string | string[]) => {
    const questionId = questions[currentStep - 1].id;
    const responseValue = Array.isArray(answer) ? answer.join(',') : answer;
    setResponses(prev => ({ ...prev, [questionId]: responseValue }));
    setCurrentStep(prev => prev + 1);
  };

  const handleStartFromHomepage = () => {
    setCurrentStep(0);
  };

  const handleStart = () => {
    setCurrentStep(1);
  };

  const handleShowTips = () => {
    setCurrentStep(totalSteps);
  };

  const handleFinish = () => {
    setCurrentStep(0);
    setResponses({});
  };

  const handleRestart = () => {
    setCurrentStep(-1);
    setResponses({});
  };

  const handleBack = () => {
    if (currentStep > -1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleForward = () => {
    if (currentStep >= 1 && currentStep < questions.length) {
      // Skip current question by setting a default response
      const questionId = questions[currentStep - 1].id;
      setResponses(prev => ({ ...prev, [questionId]: 'skipped' }));
      setCurrentStep(prev => prev + 1);
    }
  };

  const getScreenTitle = () => {
    if (currentStep === -1) return '';
    if (currentStep === 0) return t.welcome;
    if (currentStep <= questions.length) return `${t.question} ${currentStep}`;
    if (currentStep === questions.length + 1) return t.results;
    return t.healthTips;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Modern Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-200/30 dark:bg-teal-800/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 -left-10 w-32 h-32 bg-cyan-200/30 dark:bg-cyan-800/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-1/4 w-24 h-24 bg-blue-200/30 dark:bg-blue-800/20 rounded-full blur-2xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-gradient-to-r from-teal-300/20 to-cyan-300/20 rounded-full blur-xl animate-bounce"></div>
      </div>
      
      <div className="container mx-auto max-w-2xl px-4 py-8 relative z-10">
        {/* Header with Controls - Only show if not on homepage */}
        {currentStep !== -1 && (
          <div className="text-center mb-8 relative">
            {/* Theme and Language Controls */}
            <div className="absolute top-0 right-0 flex items-center space-x-2">
              <LanguageToggle />
              <ThemeToggle />
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center mb-4"
            >
              <div className="relative mr-3">
                <img 
                  src={cervicalAwarenessRibbon} 
                  alt="Cervical Cancer Awareness Ribbon"
                  className="w-10 h-10 object-contain"
                />
                <Sparkles className="w-4 h-4 text-cyan-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <h1 className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent text-3xl">
                {t.appTitle}
              </h1>
            </motion.div>
            <p className="text-gray-600 dark:text-gray-400">{t.appSubtitle}</p>
          </div>
        )}

        {/* Progress Indicator */}
        {currentStep > 0 && currentStep < totalSteps && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <ProgressIndicator 
              currentStep={currentStep} 
              totalSteps={totalSteps - 1} // exclude welcome screen from progress
            />
          </motion.div>
        )}

        {/* 3D Navigation Buttons */}
        {currentStep > 0 && currentStep < totalSteps && (
          <motion.div 
            className="mb-6 flex items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <BackButton3D onClick={handleBack} text={t.back} />
            </motion.div>
            
            {/* Forward Button - Show from question 2 onwards */}
            {currentStep >= 2 && currentStep <= questions.length && (
              <motion.div 
                className="flex items-center space-x-2 bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-full px-3 py-2 border border-gray-200/50 dark:border-gray-600/50"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                  {t.skipOptional}
                </span>
                <ForwardButton3D 
                  onClick={handleForward} 
                  size="sm"
                  variant="inline"
                />
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Landing Page renders outside chat container */}
        {currentStep === -1 && (
          <LandingPage onStart={handleStartFromHomepage} />
        )}

        {/* Chat Container - Only show if not on homepage */}
        {currentStep !== -1 && (
          <motion.div 
            className="glassmorphism-card rounded-3xl shadow-2xl p-6 min-h-[500px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="mb-4">
              <h2 className="text-teal-600 dark:text-teal-400 text-sm flex items-center">
                <Heart className="w-3 h-3 mr-1" />
                {getScreenTitle()}
              </h2>
            </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {currentStep === 0 && (
                <WelcomeScreen onStart={handleStart} />
              )}
              
              {currentStep >= 1 && currentStep <= questions.length && (
                (() => {
                  const currentQuestion = questions[currentStep - 1];
                  if (currentQuestion.isSpecial && currentQuestion.id === 'hpvVaccination') {
                    return <HPVQuestionScreen onAnswer={handleAnswer} />;
                  }
                  if (currentQuestion.isMultiSelect && currentQuestion.id === 'symptoms') {
                    return <SymptomsQuestionScreen onAnswer={handleAnswer} />;
                  }
                  return (
                    <QuestionScreen
                      question={currentQuestion.question}
                      options={currentQuestion.options}
                      onAnswer={handleAnswer}
                    />
                  );
                })()
              )}
              
              {currentStep === questions.length + 1 && (
                <ConclusionScreen
                  onShowTips={handleShowTips}
                  onFinish={handleFinish}
                  responses={responses}
                />
              )}
              
              {currentStep === totalSteps && (
                <PreventiveTipsScreen onRestart={handleRestart} />
              )}
            </motion.div>
          </AnimatePresence>
          </motion.div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p>{t.disclaimer}</p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}