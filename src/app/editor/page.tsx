import { redirect } from 'next/navigation';
import EditorPage from './components/EditorPage';
import { readUserSession } from '@src/lib/actions';
import { PathPages } from '@src/lib/constants';

export default async function page() {
  const { data, error } = await readUserSession();
  if (!data.session) return redirect(PathPages.SignUp);
  return <EditorPage errorAuth={error} />;
}