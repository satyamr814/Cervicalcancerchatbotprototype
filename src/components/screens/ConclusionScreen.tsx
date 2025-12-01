import { useState, useEffect } from 'react';
import { ChatMessage } from '../ChatMessage';
import { OptionButton } from '../OptionButton';
import { TypingIndicator } from '../TypingIndicator';
import { Card } from '../ui/card';
import { useApp } from '../contexts/AppContext';
import { translations } from '../translations/translations';
import { predictRisk, getRiskInsights, RiskFactors } from '../utils/riskPrediction';
import { AlertTriangle, CheckCircle2, Activity } from 'lucide-react';

interface ConclusionScreenProps {
  onShowTips: () => void;
  onFinish: () => void;
  responses: Record<string, string>;
}

export function ConclusionScreen({ onShowTips, onFinish, responses }: ConclusionScreenProps) {
  const { language } = useApp();
  const t = translations[language];
  const [showTyping, setShowTyping] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [showRiskAssessment, setShowRiskAssessment] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowTyping(false);
      setShowMessage(true);
    }, 1000);

    const timer2 = setTimeout(() => {
      setShowRiskAssessment(true);
    }, 2000);

    const timer3 = setTimeout(() => {
      setShowButtons(true);
    }, 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Calculate risk assessment
  const riskLevel = predictRisk(responses as RiskFactors);
  const insights = getRiskInsights(responses as RiskFactors);

  const getRiskMessage = () => {
    switch (riskLevel) {
      case 'low': return t.lowRisk;
      case 'moderate': return t.moderateRisk;
      case 'high': return t.highRisk;
      default: return t.lowRisk;
    }
  };

  const getRiskColor = () => {
    switch (riskLevel) {
      case 'low': return 'text-green-700 dark:text-green-300';
      case 'moderate': return 'text-yellow-700 dark:text-yellow-300';
      case 'high': return 'text-red-700 dark:text-red-300';
      default: return 'text-green-700 dark:text-green-300';
    }
  };

  const getRiskBgColor = () => {
    switch (riskLevel) {
      case 'low': return 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800';
      case 'moderate': return 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800';
      case 'high': return 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800';
      default: return 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800';
    }
  };

  const getRiskIcon = () => {
    switch (riskLevel) {
      case 'low': return <CheckCircle2 className="w-5 h-5" />;
      case 'moderate': return <Activity className="w-5 h-5" />;
      case 'high': return <AlertTriangle className="w-5 h-5" />;
      default: return <CheckCircle2 className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-4">
      {showTyping && <TypingIndicator />}
      
      {showMessage && (
        <ChatMessage
          message={t.conclusionTitle}
          isBot={true}
        />
      )}

      {showRiskAssessment && (
        <Card className={`glassmorphism-card p-4 ${getRiskBgColor()}`}>
          <div className="flex items-start space-x-3">
            <div className={`${getRiskColor()} mt-0.5`}>
              {getRiskIcon()}
            </div>
            <div className="flex-1">
              <h3 className={`mb-2 ${getRiskColor()}`}>
                {language === 'en' ? 'Risk Assessment' : 'जोखिम मूल्यांकन'}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                {getRiskMessage()}
              </p>
              
              {insights.length > 0 && (
                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                    {language === 'en' ? 'Key factors noted:' : 'मुख्य कारक:'}
                  </p>
                  {insights.slice(0, 3).map((insight, index) => (
                    <p key={index} className="text-xs text-gray-600 dark:text-gray-400">
                      • {insight}
                    </p>
                  ))}
                </div>
              )}
              
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 italic">
                {language === 'en' 
                  ? 'This assessment is based on known risk factors and is for educational purposes only.'
                  : 'यह मूल्यांकन ज्ञात जोखिम कारकों पर आधारित है और केवल शैक्षिक उद्देश्यों के लिए है।'
                }
              </p>
            </div>
          </div>
        </Card>
      )}

      {showButtons && (
        <div className="space-y-3">
          <OptionButton
            text={t.showTips}
            onClick={onShowTips}
            delay={0.2}
          />
          <OptionButton
            text={language === 'en' ? '🏥 Access Health Dashboard' : '🏥 स्वास्थ्य डैशबोर्ड'}
            onClick={() => {
              // This would navigate to dashboard - for demo purposes
              alert(language === 'en' ? 'Dashboard feature coming soon!' : 'डैशबोर्ड सुविधा जल्द आ रही है!');
            }}
            delay={0.3}
            variant="secondary"
          />
          <OptionButton
            text={t.finishHere}
            onClick={onFinish}
            delay={0.4}
            variant="secondary"
          />
        </div>
      )}
    </div>
  );
}