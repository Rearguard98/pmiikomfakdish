import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://pmiikomfakdish.or.id',

  // Image optimization configuration
  image: {
    domains: ['pmiikomfakdish.or.id', 'cdn.sanity.io'],
    cacheDir: './.cache/images',
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },

  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/admin'),
      changefreq: 'weekly',
      priority: 0.7,
    }),
    sanity({
      projectId: 'ywo19okn',
      dataset: 'production',
      useCdn: false,
      apiVersion: "2025-08-20",
      studioBasePath: "/admin",
    }),
    react(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
});