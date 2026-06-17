// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import rehypeExternalLinks from 'rehype-external-links';

// https://astro.build/config
export default defineConfig({
  // Production domain. Used for canonical URLs, Open Graph tags, sitemap,
  // and robots.txt.
  site: 'https://shivapuri-baba.com',

  // Open external links in a new tab with safe rel attributes.
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        { target: '_blank', rel: ['noopener', 'noreferrer'] },
      ],
    ],
  },

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()]
});