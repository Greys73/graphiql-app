'use server';

import createSupabaseServerClient from '../supabase/server';

export async function readUserSession() {
  const supabase = await createSupabaseServerClient();
  return supabase.auth.getSession();
}

export async function signUp({ email, password }: { email: string; password: string }) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.auth.signUp({ email, password });
  return JSON.stringify(result);
}

export async function login({ email, password }: { email: string; password: string }) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.auth.signInWithPassword({ email, password });
  return JSON.stringify(result);
}

export async function logOut() {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.auth.signOut();
  return JSON.stringify(result);
}
