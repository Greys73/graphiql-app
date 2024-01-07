import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '../test-utils';
import NavPanel from '@src/components/NavPanel';

vi.mock('next/navigation', () => {
  return {
    useRouter: () => {},
    usePathname: () => {},
  };
});

describe('Navigation panel tests', () => {
  test('is Home button displayed', async () => {
    render(<NavPanel isAuth={null} errorAuth={null} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
