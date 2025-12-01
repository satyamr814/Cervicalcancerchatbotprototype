import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChatMessage } from '../ChatMessage';
import { TypingIndicator } from '../TypingIndicator';
import { useApp } from '../contexts/AppContext';
import { translations } from '../translations/translations';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

interface SymptomsQuestionScreenProps {
  onAnswer: (answers: string[]) => void;
}

export function SymptomsQuestionScreen({ onAnswer }: SymptomsQuestionScreenProps) {
  const { language } = useApp();
  const t = translations[language];
  const [showTyping, setShowTyping] = useState(true);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [expandedSymptoms, setExpandedSymptoms] = useState<string[]>([]);
  const [selectedSubOptions, setSelectedSubOptions] = useState<Record<string, string[]>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const symptoms = ['abnormalBleeding', 'unusualDischarge', 'pelvicPain', 'painDuringIntercourse', 'noSymptoms'];
  
  const bleedingSubOptions = ['heavyPeriods', 'bleedingAfterIntercourse', 'bleedingAfterMenopause'];
  const dischargeSubOptions = ['wateryPale', 'bloody', 'odor', 'persistentDischarge'];
  const bloodySubOptions = ['pink', 'brown', 'crimson'];
  const odorSubOptions = ['foul', 'fishy'];

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

  const toggleOption = (option: string) => {
    if (option === 'noSymptoms') {
      // If "No symptoms" is selected, clear all other selections
      setSelectedOptions(['noSymptoms']);
      setExpandedSymptoms([]);
      setSelectedSubOptions({});
    } else {
      // If any other symptom is selected, remove "No symptoms"
      const newSelections = selectedOptions.filter(opt => opt !== 'noSymptoms');
      
      if (selectedOptions.includes(option)) {
        // Remove the option and its sub-options
        setSelectedOptions(newSelections.filter(opt => opt !== option));
        setExpandedSymptoms(prev => prev.filter(sym => sym !== option));
        setSelectedSubOptions(prev => {
          const updated = { ...prev };
          delete updated[option];
          return updated;
        });
      } else {
        // Add the option
        setSelectedOptions([...newSelections, option]);
        
        // Auto-expand for bleeding and discharge
        if (option === 'abnormalBleeding' || option === 'unusualDischarge') {
          setExpandedSymptoms(prev => [...prev, option]);
        }
      }
    }
  };

  const toggleSubOption = (parentSymptom: string, subOption: string) => {
    setSelectedSubOptions(prev => {
      const currentSubs = prev[parentSymptom] || [];
      const updated = { ...prev };
      
      if (currentSubs.includes(subOption)) {
        updated[parentSymptom] = currentSubs.filter(sub => sub !== subOption);
      } else {
        updated[parentSymptom] = [...currentSubs, subOption];
      }
      
      return updated;
    });
  };

  const toggleSymptomExpansion = (symptom: string) => {
    setExpandedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(sym => sym !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSubmit = () => {
    setIsCompleted(true);
    setTimeout(() => {
      // Build the final answer array including sub-options
      let finalAnswers = [...selectedOptions];
      
      // Add sub-options to the answers
      Object.entries(selectedSubOptions).forEach(([parentSymptom, subOptions]) => {
        if (selectedOptions.includes(parentSymptom) && subOptions.length > 0) {
          finalAnswers = [...finalAnswers, ...subOptions];
        }
      });
      
      onAnswer(finalAnswers.length > 0 ? finalAnswers : ['noSymptoms']);
    }, 500);
  };

  const getTranslatedOption = (option: string) => {
    return (t.options as any)[option] || option;
  };

  return (
    <div className="space-y-4">
      {showTyping && <TypingIndicator />}
      
      {showQuestion && (
        <ChatMessage
          message={t.questions.symptoms}
          isBot={true}
        />
      )}

      {isCompleted && (
        <ChatMessage
          message={selectedOptions.length > 0 
            ? (() => {
                let allSelections = [...selectedOptions.map(opt => getTranslatedOption(opt))];
                
                // Add sub-options to display
                Object.entries(selectedSubOptions).forEach(([parentSymptom, subOptions]) => {
                  if (selectedOptions.includes(parentSymptom) && subOptions.length > 0) {
                    const subOptionsText = subOptions.map(sub => `- ${getTranslatedOption(sub)}`).join(', ');
                    const parentIndex = allSelections.findIndex(sel => sel === getTranslatedOption(parentSymptom));
                    if (parentIndex !== -1) {
                      allSelections[parentIndex] = `${getTranslatedOption(parentSymptom)} (${subOptionsText})`;
                    }
                  }
                });
                
                return allSelections.join(', ');
              })()
            : getTranslatedOption('noSymptoms')
          }
          isBot={false}
        />
      )}

      {showOptions && !isCompleted && (
        <div className="space-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {language === 'en' ? 'Select all that apply:' : 'जो लागू हो सभी का चयन करें:'}
          </p>
          
          {symptoms.map((symptom, index) => {
            const isSelected = selectedOptions.includes(symptom);
            const isExpanded = expandedSymptoms.includes(symptom);
            const hasSubOptions = symptom === 'abnormalBleeding' || symptom === 'unusualDischarge';
            
            return (
              <div key={symptom}>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => toggleOption(symptom)}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left flex items-center justify-between ${
                    isSelected
                      ? 'border-teal-400 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300'
                      : 'border-gray-200 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 hover:border-teal-300 dark:hover:border-teal-600'
                  } option-button-3d`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex-1">{getTranslatedOption(symptom)}</span>
                  <div className="flex items-center space-x-2">
                    {isSelected && hasSubOptions && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSymptomExpansion(symptom);
                        }}
                        className="p-1 rounded-full hover:bg-teal-200 dark:hover:bg-teal-800 transition-colors"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    )}
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center"
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </div>
                </motion.button>

                {/* Sub-options for abnormal bleeding */}
                {isSelected && isExpanded && symptom === 'abnormalBleeding' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="ml-6 mt-2 space-y-2"
                  >
                    {bleedingSubOptions.map((subOption) => {
                      const isSubSelected = (selectedSubOptions[symptom] || []).includes(subOption);
                      return (
                        <button
                          key={subOption}
                          onClick={() => toggleSubOption(symptom, subOption)}
                          className={`w-full p-3 rounded-lg border transition-all duration-200 text-left text-sm flex items-center justify-between ${
                            isSubSelected
                              ? 'border-cyan-300 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300'
                              : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:border-cyan-300'
                          }`}
                        >
                          <span>{getTranslatedOption(subOption)}</span>
                          {isSubSelected && (
                            <div className="w-4 h-4 bg-cyan-500 rounded-full flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </motion.div>
                )}

                {/* Sub-options for unusual discharge */}
                {isSelected && isExpanded && symptom === 'unusualDischarge' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="ml-6 mt-2 space-y-2"
                  >
                    {dischargeSubOptions.map((subOption) => {
                      const isSubSelected = (selectedSubOptions[symptom] || []).includes(subOption);
                      const hasNestedOptions = subOption === 'bloody' || subOption === 'odor';
                      
                      return (
                        <div key={subOption}>
                          <button
                            onClick={() => toggleSubOption(symptom, subOption)}
                            className={`w-full p-3 rounded-lg border transition-all duration-200 text-left text-sm flex items-center justify-between ${
                              isSubSelected
                                ? 'border-cyan-300 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300'
                                : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:border-cyan-300'
                            }`}
                          >
                            <span>{getTranslatedOption(subOption)}</span>
                            {isSubSelected && (
                              <div className="w-4 h-4 bg-cyan-500 rounded-full flex items-center justify-center">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </button>

                          {/* Nested sub-options for bloody discharge */}
                          {isSubSelected && subOption === 'bloody' && (
                            <div className="ml-4 mt-2 space-y-1">
                              {bloodySubOptions.map((nestedOption) => {
                                const isNestedSelected = (selectedSubOptions[`${symptom}_${subOption}`] || []).includes(nestedOption);
                                return (
                                  <button
                                    key={nestedOption}
                                    onClick={() => toggleSubOption(`${symptom}_${subOption}`, nestedOption)}
                                    className={`w-full p-2 rounded border text-xs transition-all duration-200 text-left flex items-center justify-between ${
                                      isNestedSelected
                                        ? 'border-blue-300 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                                        : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-blue-300'
                                    }`}
                                  >
                                    <span>{getTranslatedOption(nestedOption)}</span>
                                    {isNestedSelected && (
                                      <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                                        <Check className="w-2 h-2 text-white" />
                                      </div>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          )}

                          {/* Nested sub-options for odor */}
                          {isSubSelected && subOption === 'odor' && (
                            <div className="ml-4 mt-2 space-y-1">
                              {odorSubOptions.map((nestedOption) => {
                                const isNestedSelected = (selectedSubOptions[`${symptom}_${subOption}`] || []).includes(nestedOption);
                                return (
                                  <button
                                    key={nestedOption}
                                    onClick={() => toggleSubOption(`${symptom}_${subOption}`, nestedOption)}
                                    className={`w-full p-2 rounded border text-xs transition-all duration-200 text-left flex items-center justify-between ${
                                      isNestedSelected
                                        ? 'border-purple-300 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                                        : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-purple-300'
                                    }`}
                                  >
                                    <span>{getTranslatedOption(nestedOption)}</span>
                                    {isNestedSelected && (
                                      <div className="w-3 h-3 bg-purple-500 rounded-full flex items-center justify-center">
                                        <Check className="w-2 h-2 text-white" />
                                      </div>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </div>
            );
          })}

          {selectedOptions.length > 0 && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleSubmit}
              className="w-full p-4 medical-3d-button rounded-xl text-white mt-6"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {language === 'en' ? 'Continue' : 'जारी रखें'}
            </motion.button>
          )}
        </div>
      )}
    </div>
  );
}