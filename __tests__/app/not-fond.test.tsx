import { render, screen } from '../test-utils';
import { describe, expect, test } from 'vitest';

import WelcomePage from '@src/app/components/WelcomePage';

describe('404 Page', () => {
  test('test 404 page an invalid route', () => {
    window.history.pushState({}, '404', '/404');
    render(<WelcomePage isAuth={null} errorAuth={null} />);
    expect(screen.getByText(/Oops! Something went wrong.../i)).toBeInTheDocument();
  });
});
