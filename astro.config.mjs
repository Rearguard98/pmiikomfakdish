// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import cloudflare from '@astrojs/cloudflare';

import sanity from '@sanity/astro';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://pmiikomfakdish.or.id',
  integrations: [mdx(), sitemap(), sanity(), react()],

  vite: {
  plugins: [tailwindcss()],
},
  adapter: cloudflare({
    imageService:"compile",
    platformProxy: {
      enabled: true,
    }
  }),
});