import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Providers } from '@src/app/providers';
import Header from '@src/components/Header';
import Footer from '@src/components/Footer';
import { fonts } from '../styles/fonts';
import '../styles/styles.css';

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
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
