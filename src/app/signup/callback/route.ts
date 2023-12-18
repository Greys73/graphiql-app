import createSupabaseServerClient from '@src/lib/supabase/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const isAuth = cookies().get('supabase-auth-token');

  if (isAuth) {
    return NextResponse.redirect(requestUrl.origin);
  }

  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    const supabase = await createSupabaseServerClient();

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(requestUrl.origin);
    }
  }

  return NextResponse.redirect('/');
}
