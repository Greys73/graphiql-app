import { render, screen } from '../../test-utils';
import { describe, expect, test, vi } from 'vitest';
import LoginPage from '@src/app/login/components/LoginPage';

describe('Login Page tests', () => {
  test('Buttons count', () => {
    render(<LoginPage />);
    expect(screen.getAllByRole('button').length).toBe(3);
  });
});
