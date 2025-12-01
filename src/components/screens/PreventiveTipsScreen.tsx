import { useState, useEffect } from 'react';
import { ChatMessage } from '../ChatMessage';
import { OptionButton } from '../OptionButton';
import { TypingIndicator } from '../TypingIndicator';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { CheckCircle, MapPin, Calendar, BookOpen } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { translations } from '../translations/translations';
import { MedicalCentersModal } from '../MedicalCentersModal';

interface PreventiveTipsScreenProps {
  onRestart: () => void;
}

export function PreventiveTipsScreen({ onRestart }: PreventiveTipsScreenProps) {
  const { language } = useApp();
  const t = translations[language];
  const [showTyping, setShowTyping] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showMedicalModal, setShowMedicalModal] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowTyping(false);
      setShowMessage(true);
    }, 800);

    const timer2 = setTimeout(() => {
      setShowTips(true);
    }, 1300);

    const timer3 = setTimeout(() => {
      setShowButton(true);
    }, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const tips = [
    t.tips.screening,
    t.tips.vaccination,
    t.tips.safeHealth,
    t.tips.lifestyle,
    t.tips.stayInformed
  ];

  return (
    <div className="space-y-4">
      {showTyping && <TypingIndicator />}
      
      {showMessage && (
        <ChatMessage
          message={t.tipsTitle}
          isBot={true}
        />
      )}

      {showTips && (
        <Card className="glassmorphism-card p-4 bg-gradient-to-r from-teal-50/50 to-cyan-50/50 dark:from-teal-950/20 dark:to-cyan-950/20 border-none shadow-lg max-h-96 overflow-y-auto">
          <div className="space-y-4">
            {tips.map((tip, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <CheckCircle className="w-5 h-5 text-[#4DB6AC] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-gray-800 dark:text-gray-200 mb-1">{tip.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>{language === 'en' ? 'Remember:' : 'याद रखें:'}</strong> {t.reminder}
            </p>
          </div>
        </Card>
      )}

      {showButton && (
        <div className="space-y-3">
          {/* Medical App Features */}
          <Card className="glassmorphism-card p-4 bg-gradient-to-r from-teal-50/50 to-cyan-50/50 dark:from-teal-950/20 dark:to-cyan-950/20 border-teal-200 dark:border-teal-800">
            <h4 className="text-teal-600 dark:text-teal-400 font-medium mb-3 flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              {language === 'en' ? 'Additional Resources' : 'अतिरिक्त संसाधन'}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button
                onClick={() => setShowMedicalModal(true)}
                variant="outline"
                className="justify-start glassmorphism-card border-teal-200 dark:border-teal-700 hover:bg-teal-50 dark:hover:bg-teal-900/20"
              >
                <MapPin className="w-4 h-4 mr-2 text-teal-500" />
                {language === 'en' ? 'Find Healthcare Centers' : 'स्वास्थ्य केंद्र खोजें'}
              </Button>
              <Button
                onClick={() => {
                  // Mock reminder feature
                  alert(language === 'en' ? 'Reminder set for your next screening!' : 'आपकी अगली जांच के लिए रिमाइंडर सेट किया गया!');
                }}
                variant="outline"
                className="justify-start glassmorphism-card border-cyan-200 dark:border-cyan-700 hover:bg-cyan-50 dark:hover:bg-cyan-900/20"
              >
                <Calendar className="w-4 h-4 mr-2 text-cyan-500" />
                {language === 'en' ? 'Set Screening Reminder' : 'जांच रिमाइंडर सेट करें'}
              </Button>
            </div>
          </Card>

          <OptionButton
            text={t.startOver}
            onClick={onRestart}
            delay={0.2}
          />
        </div>
      )}

      <MedicalCentersModal 
        isOpen={showMedicalModal}
        onClose={() => setShowMedicalModal(false)}
      />
    </div>
  );
}