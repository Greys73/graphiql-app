'use client';

import { ReactNode } from 'react';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import ErrorBoundary from '@src/components/ErrorBoundary';
import theme from '@src/styles/theme';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <CacheProvider>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </CacheProvider>
    </ErrorBoundary>
  );
}
