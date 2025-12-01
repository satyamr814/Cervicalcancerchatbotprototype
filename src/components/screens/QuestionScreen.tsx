import { useState, useEffect } from 'react';
import { ChatMessage } from '../ChatMessage';
import { OptionButton } from '../OptionButton';
import { TypingIndicator } from '../TypingIndicator';
import { useApp } from '../contexts/AppContext';
import { translations } from '../translations/translations';

interface QuestionScreenProps {
  question: string;
  options: string[];
  onAnswer: (answer: string) => void;
  userAnswer?: string;
}

export function QuestionScreen({ question, options, onAnswer, userAnswer }: QuestionScreenProps) {
  const { language } = useApp();
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

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    // Delay to show the selection before moving to next question
    setTimeout(() => {
      onAnswer(answer);
    }, 500);
  };

  return (
    <div className="space-y-4">
      {showTyping && <TypingIndicator />}
      
      {showQuestion && (
        <ChatMessage
          message={question}
          isBot={true}
        />
      )}

      {selectedAnswer && (
        <ChatMessage
          message={(t.options as any)[selectedAnswer] || selectedAnswer}
          isBot={false}
        />
      )}

      {showOptions && !selectedAnswer && (
        <div className="space-y-3">
          {options.map((option, index) => {
            // Get translated option text - options are now keys directly
            const translatedOption = (t.options as any)[option] || option;
            
            return (
              <OptionButton
                key={option}
                text={translatedOption}
                onClick={() => handleAnswer(option)}
                delay={index * 0.1}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}