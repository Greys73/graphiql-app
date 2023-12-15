import WelcomePage from './components/WelcomePage';
import { readUserSession } from '@src/lib/actions';

export default async function page() {
  const { data, error } = await readUserSession();
  return <WelcomePage isAuth={data.session} errorAuth={error} />;
}
