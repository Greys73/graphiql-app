import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Providers } from '@src/app/providers';

describe('Providers tests', () => {
  test('is Providers render child', () => {
    render(
      <Providers>
        <div>Child</div>
      </Providers>
    );
    expect(screen.getByText('Child')).toBeInTheDocument();
  });
});
