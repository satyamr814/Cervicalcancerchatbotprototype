// Mock prediction model for cervical cancer risk assessment
// In a real implementation, this would connect to a trained ML model

export interface RiskFactors {
  age: string;
  smoking: string;
  firstIntercourse: string;
  pregnancy: string;
  sexualPartners: string;
  contraception: string;
  iud: string;
  stds: string;
  symptoms: string;
  familyHistory: string;
  hpvVaccination: string;
  vaccinationStrategy: string;
}

export type RiskLevel = 'low' | 'moderate' | 'high';

// Convert categorical responses to numerical values for risk calculation
const mapToRiskScore = (responses: RiskFactors): number => {
  let score = 0;
  
  // Age factor (peak risk in 35-44 age group)
  const ageMap: Record<string, number> = {
    'below20': 1,
    '20-30': 1,
    '31-40': 2,
    'above40': 2,
    'skipped': 1 // neutral score for skipped questions
  };
  score += ageMap[responses.age] || 0;
  
  // Smoking (major risk factor)
  const smokingMap: Record<string, number> = {
    'yes': 4,
    'no': 0,
    'skipped': 1 // conservative estimate
  };
  score += smokingMap[responses.smoking] || 0;
  
  // Age at first intercourse (early sexual debut increases risk)
  const firstIntercourseMap: Record<string, number> = {
    'never': 0,
    'below18': 3,
    '18-25': 2,
    '26-35': 1,
    'above35': 0,
    'skipped': 1
  };
  score += firstIntercourseMap[responses.firstIntercourse] || 0;
  
  // Pregnancy factor (high parity increases risk)
  const pregnancyMap: Record<string, number> = {
    '0': 0,
    '1-2': 1,
    '3-4': 2,
    '5orMore': 3,
    'skipped': 1
  };
  score += pregnancyMap[responses.pregnancy] || 0;
  
  // Sexual partners (multiple partners increase risk)
  const sexualPartnersMap: Record<string, number> = {
    '1': 0,
    '2-3': 1,
    '4-5': 2,
    'moreThan5': 3,
    'skipped': 1
  };
  score += sexualPartnersMap[responses.sexualPartners] || 0;
  
  // Contraception (hormonal contraceptives may increase risk)
  const contraceptionMap: Record<string, number> = {
    'yesContraception': 1,
    'noContraception': 0,
    'skipped': 0.5
  };
  score += contraceptionMap[responses.contraception] || 0;
  
  // IUD usage
  const iudMap: Record<string, number> = {
    'yesIUD': 0.5, // slightly protective according to some studies
    'noIUD': 0,
    'skipped': 0
  };
  score += iudMap[responses.iud] || 0;
  
  // STDs history (increases risk)
  const stdsMap: Record<string, number> = {
    'yesSTDs': 3,
    'noSTDs': 0,
    'skipped': 1
  };
  score += stdsMap[responses.stds] || 0;
  
  // Family history (genetic predisposition)
  const familyHistoryMap: Record<string, number> = {
    'yesFamilyHistory': 3,
    'noFamilyHistory': 0,
    'skipped': 1
  };
  score += familyHistoryMap[responses.familyHistory] || 0;
  
  // HPV vaccination (protective effect)
  const hpvVaccinationMap: Record<string, number> = {
    'yesVaccinated': -2, // protective
    'noVaccinated': 2,
    'notSure': 1,
    'skipped': 1
  };
  score += hpvVaccinationMap[responses.hpvVaccination] || 0;
  
  // Symptoms (presence indicates potential issues)
  if (responses.symptoms && responses.symptoms !== 'noSymptoms') {
    const symptomsList = responses.symptoms.split(',');
    if (symptomsList.includes('abnormalBleeding')) score += 3;
    if (symptomsList.includes('unusualDischarge')) score += 2;
    if (symptomsList.includes('pelvicPain')) score += 2;
    if (symptomsList.includes('painDuringIntercourse')) score += 2;
    
    // Check for specific sub-symptoms that are more concerning
    if (symptomsList.includes('bleedingAfterIntercourse') || 
        symptomsList.includes('bleedingAfterMenopause')) score += 2;
    if (symptomsList.includes('bloody') || symptomsList.includes('foul')) score += 1;
  }
  
  return Math.max(0, score); // Ensure non-negative score
};

export const predictRisk = (responses: RiskFactors): RiskLevel => {
  const riskScore = mapToRiskScore(responses);
  
  // Adjusted thresholds for new question set
  if (riskScore <= 4) return 'low';
  if (riskScore <= 10) return 'moderate';
  return 'high';
};

export const getRiskInsights = (responses: RiskFactors): string[] => {
  const insights: string[] = [];
  
  if (responses.smoking === 'yes') {
    insights.push('Smoking significantly increases cervical cancer risk.');
  }
  
  if (responses.hpvVaccination === 'noVaccinated' || responses.hpvVaccination === 'notSure') {
    insights.push('HPV vaccination can significantly reduce cervical cancer risk.');
  }
  
  if (responses.firstIntercourse === 'below18') {
    insights.push('Early sexual activity increases exposure to HPV infections.');
  }
  
  if (responses.sexualPartners === 'moreThan5' || responses.sexualPartners === '4-5') {
    insights.push('Multiple sexual partners may increase HPV exposure risk.');
  }
  
  if (responses.familyHistory === 'yesFamilyHistory') {
    insights.push('Family history of cervical cancer may indicate genetic predisposition.');
  }
  
  if (responses.contraception === 'yesContraception') {
    insights.push('Long-term hormonal contraceptive use may slightly increase risk.');
  }
  
  if (responses.pregnancy === '5orMore') {
    insights.push('High parity (many pregnancies) may increase cervical cancer risk.');
  }
  
  if (responses.stds === 'yesSTDs') {
    insights.push('History of sexually transmitted diseases increases cervical cancer risk.');
  }
  
  if (responses.symptoms && responses.symptoms !== 'noSymptoms') {
    insights.push('Any unusual symptoms should be evaluated by a healthcare provider.');
  }
  
  return insights;
};