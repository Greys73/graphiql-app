import { createContext } from 'react';
import { Languages } from './constants/settings';
import { LangContextType } from './types/types';

const LangContext = createContext<LangContextType>({
  lang: Languages.en,
  setLang: null,
});

export default LangContext;
