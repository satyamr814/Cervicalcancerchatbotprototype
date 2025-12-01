import { Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';
import { useApp } from './contexts/AppContext';

export function ThemeToggle() {
  const { theme, setTheme } = useApp();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="w-9 h-9 p-0 hover:bg-teal-100 dark:hover:bg-teal-800 rounded-full text-teal-600 dark:text-teal-400"
      title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </Button>
  );
}