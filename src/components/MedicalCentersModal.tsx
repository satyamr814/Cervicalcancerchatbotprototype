import { useState } from 'react';
import { motion } from 'motion/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { MapPin, Phone, Clock, Star, Navigation } from 'lucide-react';
import { useApp } from './contexts/AppContext';

interface MedicalCenter {
  id: string;
  name: string;
  address: string;
  phone: string;
  rating: number;
  distance: string;
  specialty: string;
  timings: string;
}

interface MedicalCentersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MedicalCentersModal({ isOpen, onClose }: MedicalCentersModalProps) {
  const { language } = useApp();
  const [location, setLocation] = useState('');
  const [showResults, setShowResults] = useState(false);

  // Mock data - in a real app, this would come from an API
  const mockCenters: MedicalCenter[] = [
    {
      id: '1',
      name: language === 'en' ? 'Women\'s Health Clinic' : 'महिला स्वास्थ्य क्लिनिक',
      address: language === 'en' ? '123 Healthcare Avenue, Medical District' : '123 स्वास्थ्य सेवा मार्ग, चिकित्सा जिला',
      phone: '+91-9876543210',
      rating: 4.8,
      distance: '2.3 km',
      specialty: language === 'en' ? 'Gynecology & Women\'s Health' : 'स्त्री रोग और महिला स्वास्थ्य',
      timings: language === 'en' ? 'Mon-Sat: 9AM-6PM' : 'सोम-शनि: 9AM-6PM'
    },
    {
      id: '2',
      name: language === 'en' ? 'City General Hospital' : 'सिटी जनरल हॉस्पिटल',
      address: language === 'en' ? '456 Main Street, Downtown' : '456 मुख्य सड़क, डाउनटाउन',
      phone: '+91-9876543211',
      rating: 4.5,
      distance: '3.7 km',
      specialty: language === 'en' ? 'Multi-specialty Hospital' : 'बहु-विशेषता अस्पताल',
      timings: language === 'en' ? '24/7 Emergency' : '24/7 आपातकाल'
    },
    {
      id: '3',
      name: language === 'en' ? 'Preventive Care Center' : 'निवारक देखभाल केंद्र',
      address: language === 'en' ? '789 Wellness Boulevard, Health Park' : '789 वेलनेस बुलेवार्ड, हेल्थ पार्क',
      phone: '+91-9876543212',
      rating: 4.7,
      distance: '5.1 km',
      specialty: language === 'en' ? 'Preventive Health & Screening' : 'निवारक स्वास्थ्य और जांच',
      timings: language === 'en' ? 'Mon-Fri: 8AM-5PM' : 'सोम-शुक्र: 8AM-5PM'
    }
  ];

  const handleSearch = () => {
    if (location.trim()) {
      setShowResults(true);
    }
  };

  const handleGetDirections = (centerName: string) => {
    // In a real app, this would open Google Maps or similar
    alert(`Getting directions to ${centerName}...`);
  };

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="text-pink-600 dark:text-pink-400 flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            {language === 'en' ? 'Find Nearby Healthcare Centers' : 'निकटतम स्वास्थ्य केंद्र खोजें'}
          </DialogTitle>
          <DialogDescription id="dialog-description">
            {language === 'en' 
              ? 'Search for healthcare centers near your location for cervical health checkups and consultations.'
              : 'गर्भाशय ग्रीवा स्वास्थ्य जांच और परामर्श के लिए अपने स्थान के पास स्वास्थ्य केंद्रों की खोज करें।'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder={language === 'en' ? 'Enter your location...' : 'अपना स्थान दर्ज करें...'}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleSearch}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            >
              {language === 'en' ? 'Search' : 'खोजें'}
            </Button>
          </div>

          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                {language === 'en' ? 'Healthcare Centers Near You' : 'आपके पास स्वास्थ्य केंद्र'}
              </h3>
              
              {mockCenters.map((center, index) => (
                <motion.div
                  key={center.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-4 hover:shadow-lg transition-shadow duration-300 border-pink-200 dark:border-pink-800">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">
                          {center.name}
                        </h4>
                        <p className="text-sm text-pink-600 dark:text-pink-400 mb-2">
                          {center.specialty}
                        </p>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          {center.address}
                        </div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-1">
                          <Clock className="w-4 h-4 mr-1" />
                          {center.timings}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center mb-1">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          <span className="text-sm font-medium">{center.rating}</span>
                        </div>
                        <p className="text-sm text-gray-500">{center.distance}</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleCall(center.phone)}
                        variant="outline"
                        size="sm"
                        className="flex-1 border-pink-200 dark:border-pink-700 hover:bg-pink-50 dark:hover:bg-pink-900/20"
                      >
                        <Phone className="w-4 h-4 mr-1" />
                        {language === 'en' ? 'Call' : 'कॉल करें'}
                      </Button>
                      <Button
                        onClick={() => handleGetDirections(center.name)}
                        variant="outline"
                        size="sm"
                        className="flex-1 border-purple-200 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                      >
                        <Navigation className="w-4 h-4 mr-1" />
                        {language === 'en' ? 'Directions' : 'दिशा'}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}