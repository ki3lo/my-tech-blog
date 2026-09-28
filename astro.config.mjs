import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://ki3lo.github.io',
  base: '/my-tech-blog',
  integrations: [mdx(), sitemap()],
});