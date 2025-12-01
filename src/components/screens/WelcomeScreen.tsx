import { useState, useEffect } from 'react';
import { ChatMessage } from '../ChatMessage';
import { OptionButton } from '../OptionButton';
import { TypingIndicator } from '../TypingIndicator';
import { Card } from '../ui/card';
import { useApp } from '../contexts/AppContext';
import { translations } from '../translations/translations';

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const { language, userName } = useApp();
  const t = translations[language];
  const [showTyping, setShowTyping] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowTyping(false);
      setShowMessage(true);
    }, 1500);

    const timer2 = setTimeout(() => {
      setShowButtons(true);
    }, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleLearnMore = () => {
    setShowInfo(true);
  };

  return (
    <div className="space-y-4">
      {showTyping && <TypingIndicator />}
      
      {showMessage && (
        <ChatMessage
          message={t.welcomeMessage.replace('{name}', userName || 'there')}
          isBot={true}
        />
      )}

      {showInfo && (
        <Card className="glassmorphism-card p-4 bg-teal-50/50 dark:bg-teal-950/20 border-teal-200 dark:border-teal-800 mb-4">
          <h3 className="mb-2 text-teal-800 dark:text-teal-200">{t.aboutTitle}</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            {t.aboutDescription}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {t.aboutFeatures}
          </p>
        </Card>
      )}

      {showButtons && (
        <div className="space-y-3">
          <OptionButton
            text={t.startQuestionnaire}
            onClick={onStart}
            delay={0.2}
          />
          {!showInfo && (
            <OptionButton
              text={t.learnMore}
              onClick={handleLearnMore}
              delay={0.4}
              variant="secondary"
            />
          )}
        </div>
      )}
    </div>
  );
}