import '~/styles/globals.css';

import { type Metadata, type Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';

import { TRPCReactProvider } from '~/trpc/react';

export const metadata: Metadata = {
  metadataBase: new URL('https://shiharai.codingcodax.dev'),
  title: 'Shiharai - Simplify Your Subscription Tracking',
  description:
    'Track, organize, and manage all your subscriptions in one place. Stay on top of your expenses with ease.',
  keywords:
    'subscription tracker, subscription manager, track subscriptions, manage subscriptions, budgeting, expense tracking',
  authors: {
    name: 'Alexis Guzman',
    url: 'https://shiharai.codingcodax.dev',
  },
  openGraph: {
    title: 'Shiharai - Simplify Your Subscription Tracking',
    description:
      'Track, organize, and manage all your subscriptions in one place. Stay on top of your expenses with ease.',
    url: 'https://shiharai.codingcodax.dev',
    siteName: 'Shiharai',
    images: [
      {
        url: 'https://shiharai.codingcodax.dev/og.png',
        width: 1200,
        height: 630,
        alt: 'Shiharai - Simplify Your Subscription Tracking',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shiharai - Simplify Your Subscription Tracking',
    description:
      'Track, organize, and manage all your subscriptions in one place. Stay on top of your expenses with ease.',
    images: ['https://shiharai.codingcodax.dev/og.png'],
    site: '@codingcodax',
  },
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fdfcfd' },
    { media: '(prefers-color-scheme: dark)', color: '#121113' },
  ],
  maximumScale: 1,
  userScalable: false,
};

const RootLayout = ({ children }: Readonly<React.PropsWithChildren>) => {
  return (
    <html className={`${GeistSans.variable}`} lang='en'>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
};

export default RootLayout;
