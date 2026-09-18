import type { Metadata } from 'next';
import { Figtree, Fraunces } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

const figtree = Figtree({
  variable: '--font-sans',
  subsets: ['latin'],
});

const fraunces = Fraunces({
  variable: '--font-display',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Future E-commerce',
  description: 'This is an e-commerce website',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="min-h-dvh">
          <Header />
          <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
