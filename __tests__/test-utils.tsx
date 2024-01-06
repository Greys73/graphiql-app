import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@src/styles/theme';
import { render, RenderOptions } from '@testing-library/react';
import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import ErrorBoundary from '../src/components/ErrorBoundary';
import { setupStore } from '../src/store/store';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
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
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
