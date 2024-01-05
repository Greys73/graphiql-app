import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';
import { server } from '@src/mocks/node';

// const fetchMocker = createFetchMock(vi);
// fetchMocker.enableMocks();

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());
