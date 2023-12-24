'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import ErrorBoundary from '@src/components/ErrorBoundary';
import theme from '@src/styles/theme';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { setupStore } from '../store/store';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <Provider store={setupStore()}>
        <CacheProvider>
          <ChakraProvider resetCSS theme={theme}>
            {children}
          </ChakraProvider>
        </CacheProvider>
      </Provider>
    </ErrorBoundary>
  );
}
