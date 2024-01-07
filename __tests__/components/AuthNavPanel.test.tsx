import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '../test-utils';
import AuthNavPanel from '@src/components/AuthNavPanel';
import { Session } from '@supabase/supabase-js';

vi.mock('next/navigation', () => {
  return { useRouter: () => {} };
});

const isAuth: Session = {
  access_token: 'access_token',
  token_type: 'bearer',
  expires_in: 1,
  expires_at: 1,
  refresh_token: 'refresh_token',
  user: {
    id: '1',
    aud: '1',
    role: '1',
    app_metadata: {},
    user_metadata: {},
    identities: [],
    created_at: '2023',
    updated_at: '2024',
  },
};

describe('Auth panel tests', () => {
  test('is Login button displayed', async () => {
    render(<AuthNavPanel isAuth={null} errorAuth={null} />);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('is LogOut button displayed', async () => {
    render(<AuthNavPanel isAuth={isAuth} errorAuth={null} />);
    expect(screen.getByText('LogOut')).toBeInTheDocument();
  });
});
