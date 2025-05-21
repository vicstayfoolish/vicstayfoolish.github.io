// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://vicstayfoolish.github.io',
  integrations: [
    mdx(),
    tailwind({
      // 配置選項
      configFile: './tailwind.config.cjs',
    })
  ]
}); 