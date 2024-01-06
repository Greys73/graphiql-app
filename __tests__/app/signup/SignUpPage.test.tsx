import { render, screen } from '../../test-utils';
import { describe, expect, test, vi } from 'vitest';
import SignUpPage from '@src/app/signup/components/SignUpPage';

describe('SignUp Page tests', () => {
  test('Buttons count', () => {
    render(<SignUpPage />);
    expect(screen.getAllByRole('button').length).toBe(4);
  });
});
