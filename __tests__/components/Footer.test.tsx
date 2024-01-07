import { describe, expect, test } from 'vitest';
import Footer from '@src/components/Footer';
import { render, screen } from '../test-utils';

describe('Footer test', () => {
  test('Footer should work well', async () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'Greys73' })).toBeDefined();
  });
});
