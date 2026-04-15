import { createContext, useContext } from 'react';
import uiFR from './ui.fr';

export const LangContext = createContext({
  lang: 'fr',
  toggleLang: () => {},
  t: uiFR,
});

export function useLang() {
  return useContext(LangContext);
}
