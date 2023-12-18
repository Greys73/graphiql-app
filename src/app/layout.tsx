import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Providers } from '@src/app/providers';
import Header from '@src/components/Header';
import Footer from '@src/components/Footer';
import { fonts } from '../styles/fonts';
import '../styles/styles.css';
import { readUserSession } from '@src/lib/actions';

export const metadata: Metadata = {
  title: 'GraphiQL',
  description: 'GraphiQL is a playground/IDE for graphQL',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  'use server';
  const result = await readUserSession();
  const { data, error } = JSON.parse(result);

  return (
    <html lang='en' className={fonts.roboto.variable}>
      <body>
        <Providers>
          <Header isAuth={data.session} errorAuth={error} />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
