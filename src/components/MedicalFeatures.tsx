import { motion } from 'motion/react';
import { 
  MapPin, 
  Calendar, 
  Bell, 
  Heart, 
  FileText, 
  Phone,
  Clock,
  Shield,
  Activity,
  Users
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useState } from 'react';

interface MedicalFeaturesProps {
  userName: string;
}

export function MedicalFeatures({ userName }: MedicalFeaturesProps) {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const features = [
    {
      id: 'centers',
      icon: MapPin,
      title: 'Healthcare Centers',
      description: 'Find nearby cervical health clinics',
      color: 'from-teal-400 to-cyan-500',
      action: 'Find Centers'
    },
    {
      id: 'reminders',
      icon: Bell,
      title: 'Health Reminders',
      description: 'Set up screening reminders',
      color: 'from-blue-400 to-indigo-500',
      action: 'Set Reminders'
    },
    {
      id: 'tracking',
      icon: Activity,
      title: 'Health Tracking',
      description: 'Track your health journey',
      color: 'from-emerald-400 to-teal-500',
      action: 'Start Tracking'
    },
    {
      id: 'support',
      icon: Users,
      title: 'Support Groups',
      description: 'Connect with support communities',
      color: 'from-purple-400 to-pink-500',
      action: 'Join Groups'
    },
    {
      id: 'emergency',
      icon: Phone,
      title: 'Emergency Help',
      description: '24/7 medical helpline access',
      color: 'from-red-400 to-rose-500',
      action: 'Get Help'
    },
    {
      id: 'reports',
      icon: FileText,
      title: 'Health Reports',
      description: 'View and manage your reports',
      color: 'from-amber-400 to-orange-500',
      action: 'View Reports'
    }
  ];

  const quickActions = [
    { icon: Calendar, label: 'Book Screening', color: 'text-teal-600' },
    { icon: Clock, label: 'Appointment History', color: 'text-blue-600' },
    { icon: Shield, label: 'Insurance Info', color: 'text-emerald-600' },
    { icon: Heart, label: 'Wellness Tips', color: 'text-pink-600' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2"
        >
          Your Health Dashboard, {userName}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300"
        >
          Comprehensive cervical health management tools
        </motion.p>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {quickActions.map((action, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="glassmorphism-card p-4 text-center hover:shadow-lg transition-all duration-300"
          >
            <action.icon className={`w-6 h-6 mx-auto mb-2 ${action.color} hover:scale-110 transition-transform`} />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{action.label}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Main Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            whileHover={{ y: -5 }}
            className=""
          >
            <Card className="glassmorphism-card p-6 h-full relative overflow-hidden hover:shadow-2xl transition-all duration-500">
              {/* Background gradient effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 hover:opacity-10 transition-opacity duration-300`} />
              
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {feature.description}
                </p>
                
                <Button
                  size="sm"
                  className={`w-full bg-gradient-to-r ${feature.color} hover:shadow-lg text-white border-0 hover:scale-105 transition-all duration-300`}
                  onClick={() => setActiveFeature(feature.id)}
                >
                  {feature.action}
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Feature Modal/Detail (when active feature is selected) */}
      {activeFeature && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setActiveFeature(null)}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glassmorphism-card max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                Feature Coming Soon!
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We're working hard to bring you this feature. Stay tuned for updates!
              </p>
              <Button
                onClick={() => setActiveFeature(null)}
                className="medical-3d-button"
              >
                Got it!
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Health Tip of the Day */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glassmorphism-card p-6 bg-gradient-to-r from-teal-50/50 to-cyan-50/50 dark:from-teal-900/20 dark:to-cyan-900/20"
      >
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-white mb-2">💡 Health Tip of the Day</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Regular Pap smears can detect cervical changes early, even before they become cancer. 
              The American Cancer Society recommends screening every 3 years for women ages 21-65.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}