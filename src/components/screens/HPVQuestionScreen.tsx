import { useState, useEffect } from 'react';
import { ChatMessage } from '../ChatMessage';
import { OptionButton } from '../OptionButton';
import { TypingIndicator } from '../TypingIndicator';
import { useApp } from '../contexts/AppContext';
import { translations } from '../translations/translations';

interface HPVQuestionScreenProps {
  onAnswer: (answer: string) => void;
}

export function HPVQuestionScreen({ onAnswer }: HPVQuestionScreenProps) {
  const { language, userName } = useApp();
  const t = translations[language];
  const [showTyping, setShowTyping] = useState(true);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowTyping(false);
      setShowQuestion(true);
    }, 800);

    const timer2 = setTimeout(() => {
      setShowOptions(true);
    }, 1200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleInitialAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    
    setTimeout(() => {
      // For the new simple format, just proceed with the answer
      onAnswer(answer);
    }, 1000);
  };



  return (
    <div className="space-y-4">
      {showTyping && <TypingIndicator />}
      
      {showQuestion && (
        <ChatMessage
          message={t.questions.hpvVaccination}
          isBot={true}
        />
      )}

      {selectedAnswer && (
        <ChatMessage
          message={t.options[selectedAnswer as keyof typeof t.options] || selectedAnswer}
          isBot={false}
        />
      )}

      {showOptions && !selectedAnswer && (
        <div className="space-y-3">
          <OptionButton
            text={t.options.yesVaccinated}
            onClick={() => handleInitialAnswer('yesVaccinated')}
            delay={0.1}
          />
          <OptionButton
            text={t.options.noVaccinated}
            onClick={() => handleInitialAnswer('noVaccinated')}
            delay={0.2}
          />
          <OptionButton
            text={t.options.notSure}
            onClick={() => handleInitialAnswer('notSure')}
            delay={0.3}
          />
        </div>
      )}


    </div>
  );
}