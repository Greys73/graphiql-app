import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Providers } from '@src/app/providers';
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';
import { fonts } from '../styles/fonts';

export const metadata: Metadata = {
  title: 'GraphiQL',
  description: 'GraphiQL is a playground/IDE for graphQL',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className={fonts.rubik.variable}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
