import { Button } from './ui/button';
import { useApp } from './contexts/AppContext';

export function LanguageToggle() {
  const { language, setLanguage } = useApp();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="text-sm px-3 py-1 h-auto rounded-full hover:bg-teal-100 dark:hover:bg-teal-800 text-teal-600 dark:text-teal-400"
      title="Change language / भाषा बदलें"
    >
      {language === 'en' ? 'हिंदी' : 'English'}
    </Button>
  );
}