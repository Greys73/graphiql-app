import { readUserSession } from '@src/lib/actions';
import SignUpPage from './components/SignUpPage';
import { redirect } from 'next/navigation';
import { PathPages } from '@src/lib/constants/pages';

export default async function page() {
  const result = await readUserSession();
  const { data } = JSON.parse(result);

  if (data.session) return redirect(PathPages.Editor);
  return <SignUpPage />;
}
