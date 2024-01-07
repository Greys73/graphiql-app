import { describe, expect, test } from 'vitest';
import { render, screen } from '../test-utils';
import Logo from '@src/components/Logo';

describe('Logo test', () => {
  test('Logo should work well', async () => {
    render(<Logo />);
    expect(screen.getByRole('heading', { name: 'GraphQL' })).toBeDefined();
    expect(screen.getByRole('img', { name: 'GraphQL Logo' })).toBeDefined();
  });
});
