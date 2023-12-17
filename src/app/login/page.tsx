import { readUserSession } from '@src/lib/actions';
import LoginPage from './components/LoginPage';
import { redirect } from 'next/navigation';
import { PathPages } from '@src/lib/constants/pages';

export default async function page() {
  const { data } = await readUserSession();
  if (data.session) return redirect(PathPages.Home);
  return <LoginPage />;
}
