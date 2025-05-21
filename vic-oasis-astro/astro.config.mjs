// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://vicstayfoolish.github.io',
  base: '/vic-oasis-astro',
  integrations: [
    mdx(),
    tailwind({
      configFile: './tailwind.config.cjs'
    })
  ],
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory'
  }
});