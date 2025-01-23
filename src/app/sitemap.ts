import type { MetadataRoute } from 'next';

const sitemap = (): MetadataRoute.Sitemap => {
  return [
    {
      url: 'https://shiharai.codingcodax.dev',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
  ];
};

export default sitemap;
