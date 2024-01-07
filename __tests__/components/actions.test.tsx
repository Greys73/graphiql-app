import { describe, expect, test, vi } from 'vitest';
import { logOut, login, readUserSession, signUp } from '@src/lib/actions/index';

const creds = { email: 'ya@ya.ru', password: 'pswrd' };

vi.mock('@src/lib/supabase/server', () => ({
  default: async () => {
    return {
      auth: {
        getSession: () => 'Session result',
        signUp: (creds: { email: string; password: string }) => creds,
        signInWithPassword: (creds: { email: string; password: string }) => creds,
        signOut: () => 'GoodBye',
      },
    };
  },
}));

describe('Actions tests', () => {
  test('is readUserSession work', async () => {
    expect(await readUserSession()).toEqual('"Session result"');
  });
  test('is signUp work', async () => {
    expect(await signUp(creds)).toEqual('{"email":"ya@ya.ru","password":"pswrd"}');
  });
  test('is login work', async () => {
    expect(await login(creds)).toEqual('{"email":"ya@ya.ru","password":"pswrd"}');
  });
  test('is logOut work', async () => {
    expect(await logOut()).toEqual('"GoodBye"');
  });
});
