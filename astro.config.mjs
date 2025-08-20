import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';


import sanity from '@sanity/astro';
import react from '@astrojs/react';


// https://astro.build/config
export default defineConfig({
  site: 'https://pmiikomfakdish.or.id',
  integrations: [mdx(), sitemap(), sanity({
      projectId: "ywo19okn",
      dataset: "production",
      useCdn: false, // for static builds
      apiVersion: "2025-01-28",
      studioBasePath: "/admin",
    }), react()],
  vite: {
  plugins: [tailwindcss()],
},
});