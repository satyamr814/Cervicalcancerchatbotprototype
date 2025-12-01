import { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../contexts/AppContext';
import { translations } from '../translations/translations';
import { MedicalFeatures } from '../MedicalFeatures';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { 
  ArrowLeft, 
  BarChart3, 
  Calendar, 
  Heart, 
  Shield,
  TrendingUp,
  Bell,
  Users,
  Award
} from 'lucide-react';

interface DashboardScreenProps {
  onBack: () => void;
  responses: Record<string, string>;
}

export function DashboardScreen({ onBack, responses }: DashboardScreenProps) {
  const { language, userName } = useApp();
  const t = translations[language];
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'features', label: 'Features', icon: Heart },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'community', label: 'Community', icon: Users }
  ];

  const healthStats = [
    {
      label: 'Health Score',
      value: '85%',
      description: 'Based on your assessment',
      color: 'from-green-400 to-emerald-500',
      icon: TrendingUp
    },
    {
      label: 'Risk Level',
      value: 'Low',
      description: 'Continue healthy habits',
      color: 'from-teal-400 to-cyan-500',
      icon: Shield
    },
    {
      label: 'Next Screening',
      value: '2 years',
      description: 'Recommended timeline',
      color: 'from-blue-400 to-indigo-500',
      icon: Calendar
    },
    {
      label: 'Reminders Set',
      value: '3',
      description: 'Active health reminders',
      color: 'from-purple-400 to-pink-500',
      icon: Bell
    }
  ];

  const achievements = [
    { title: 'Health Advocate', description: 'Completed first assessment', earned: true },
    { title: 'Screening Scheduler', description: 'Set up screening reminders', earned: false },
    { title: 'Community Helper', description: 'Shared knowledge with others', earned: false },
    { title: 'Wellness Warrior', description: 'Maintain 3-month streak', earned: false }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          onClick={onBack}
          variant="ghost"
          className="text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-200 hover:bg-teal-50 dark:hover:bg-teal-900/20 p-2 transition-all duration-300 rounded-full"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t.back}
        </Button>
        
        <motion.h1
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent"
        >
          Health Dashboard
        </motion.h1>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 p-1 bg-white/50 dark:bg-gray-800/50 rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-teal-400 to-cyan-500 text-white shadow-lg'
                : 'text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Welcome Message */}
            <Card className="glassmorphism-card p-6 bg-gradient-to-r from-teal-50/50 to-cyan-50/50 dark:from-teal-900/20 dark:to-cyan-900/20">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    Welcome back, {userName}! 👋
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Your cervical health journey continues. Here's your latest overview.
                  </p>
                </div>
              </div>
            </Card>

            {/* Health Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {healthStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="glassmorphism-card p-4 text-center hover:shadow-lg transition-all duration-300">
                    <div className={`w-10 h-10 mx-auto mb-3 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {stat.label}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {stat.description}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Achievements */}
            <Card className="glassmorphism-card p-6">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-teal-600" />
                Your Achievements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 ${
                      achievement.earned
                        ? 'border-teal-200 bg-teal-50/50 dark:border-teal-700 dark:bg-teal-900/20'
                        : 'border-gray-200 bg-gray-50/50 dark:border-gray-700 dark:bg-gray-800/20'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        achievement.earned
                          ? 'bg-teal-500 text-white'
                          : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
                      }`}>
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <div className={`font-medium ${
                          achievement.earned
                            ? 'text-teal-800 dark:text-teal-200'
                            : 'text-gray-600 dark:text-gray-400'
                        }`}>
                          {achievement.title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {achievement.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'features' && (
          <MedicalFeatures userName={userName || 'User'} />
        )}

        {activeTab === 'appointments' && (
          <Card className="glassmorphism-card p-8 text-center">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-teal-500" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Appointment Management
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Schedule and manage your cervical health appointments with ease.
            </p>
            <Button className="medical-3d-button">
              Schedule Appointment
            </Button>
          </Card>
        )}

        {activeTab === 'community' && (
          <Card className="glassmorphism-card p-8 text-center">
            <Users className="w-16 h-16 mx-auto mb-4 text-teal-500" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Community Support
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Connect with others on their cervical health journey. Share experiences and support each other.
            </p>
            <Button className="medical-3d-button">
              Join Community
            </Button>
          </Card>
        )}
      </motion.div>
    </div>
  );
}