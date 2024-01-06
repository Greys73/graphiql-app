'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import ErrorBoundary from '@src/components/ErrorBoundary';
import theme from '@src/styles/theme';
import { ReactNode, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { setupStore } from '../store/store';
import LangContext from '@src/lib/LangContext';
import { Languages } from '@src/lib/constants/settings';
import { LanguageItem } from '@src/lib/types/types';

export function Providers({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<LanguageItem>(Languages.en);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      setLang(localStorage.getItem('@base_language') === Languages.ru.name ? Languages.ru : Languages.en);
    }
  }, []);

  return (
    <ErrorBoundary>
      <LangContext.Provider value={{ lang, setLang }}>
        <Provider store={setupStore()}>
          <CacheProvider>
            <ChakraProvider resetCSS theme={theme}>
              {children}
            </ChakraProvider>
          </CacheProvider>
        </Provider>
      </LangContext.Provider>
    </ErrorBoundary>
  );
}
