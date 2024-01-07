import WelcomePage from './components/WelcomePage';
import { readUserSession } from '@src/lib/actions';

export default async function page() {
  const result = await readUserSession();
  const { data, error } = JSON.parse(result);

  return <WelcomePage isAuth={data.session} errorAuth={error} />;
}
