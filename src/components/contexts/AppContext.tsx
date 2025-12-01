import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';
type Theme = 'light' | 'dark';

interface AppContextType {
  language: Language;
  theme: Theme;
  userName: string;
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  setUserName: (name: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('light');
  const [userName, setUserName] = useState<string>('');

  return (
    <AppContext.Provider value={{ language, theme, userName, setLanguage, setTheme, setUserName }}>
      <div className={theme}>
        {children}
      </div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}