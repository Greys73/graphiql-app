import { redirect } from 'next/navigation';
import EditorPage from './components/EditorPage';
import { readUserSession } from '@src/lib/actions';
import { PathPages } from '@src/lib/constants';

export default async function page() {
  const result = await readUserSession();
  const { data, error } = JSON.parse(result);
  if (!data.session) return redirect(PathPages.SignUp);

  return <EditorPage errorAuth={error} />;
}
