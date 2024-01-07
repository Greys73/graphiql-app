import createSupabaseServerClient from '@src/lib/supabase/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { PathPages } from '@src/lib/constants/pages';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const isAuth = cookies().get('supabase-auth-token');

  if (isAuth) {
    return NextResponse.redirect(`${requestUrl.protocol}//${requestUrl.hostname}${PathPages.Editor}`);
  }

  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    const supabase = await createSupabaseServerClient();

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${requestUrl.protocol}//${requestUrl.hostname}${PathPages.Editor}`);
    }
  }

  return NextResponse.redirect(PathPages.Home);
}
