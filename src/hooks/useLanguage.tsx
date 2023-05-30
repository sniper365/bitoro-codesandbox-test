import { useState, useEffect } from 'react';
import i18n from '../i18n'

interface LanguageHookReturnType {
  language: string;
  changeLanguage: (lng: string) => void;
}

const useLanguage = (): LanguageHookReturnType => {
  const [language, setLanguage] = useState<string>(i18n.language);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return { language, changeLanguage };
};

export default useLanguage;
