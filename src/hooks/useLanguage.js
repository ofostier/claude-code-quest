import { useState, useEffect } from 'react';

const STORAGE_KEY = 'ccq_lang';

export function useLanguage() {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || 'fr';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const toggleLang = () => setLang((l) => (l === 'fr' ? 'en' : 'fr'));

  return { lang, toggleLang };
}
