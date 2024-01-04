import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { Provider } from 'react-redux';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { setupStore } from '@src/store/store';
import EditorPage from '@src/app/editor/components/EditorPage';

vi.mock('cm6-graphql', () => {
  return {
    graphql: () => ({
      extension: [],
    }),
  };
});

vi.mock('@codemirror/lang-json', () => {
  return {
    json: () => ({
      extension: [],
    }),
  };
});

describe('PlayGround tests', () => {
  test('test 1', () => {
    render(
      <Provider store={setupStore()}>
        <CacheProvider>
          <ChakraProvider resetCSS theme={theme}>
            <EditorPage errorAuth={null} />
          </ChakraProvider>
        </CacheProvider>
      </Provider>
    );
    expect(screen.getByText(/PlayGround/i)).toBeInTheDocument();
  });
});
