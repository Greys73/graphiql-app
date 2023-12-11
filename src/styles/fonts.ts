import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: '400',
});

export const fonts = {
  roboto,
};
