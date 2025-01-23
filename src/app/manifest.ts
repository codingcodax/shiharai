import type { MetadataRoute } from 'next';

const manifest = (): MetadataRoute.Manifest => {
  return {
    name: 'Shiharai - Simplify Your Subscription Tracking',
    short_name: 'Shiharai',
    description:
      'Track, organize, and manage all your subscriptions in one place. Stay on top of your expenses with ease.',
    start_url: '/',
    display: 'standalone',
    theme_color: '#fdfcfd',
    background_color: '#fdfcfd',
    icons: [
      {
        src: '/favicons/favicon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicons/favicon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/favicons/favicon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
    ],
  };
};

export default manifest;
