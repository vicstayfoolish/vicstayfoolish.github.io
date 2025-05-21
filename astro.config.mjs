// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import remarkDirective from 'remark-directive';
import rehypeRaw from 'rehype-raw';

// https://astro.build/config
export default defineConfig({
  site: 'https://vicstayfoolish.github.io',
  // base: '/vic-oasis-astro',
  integrations: [
    mdx({
      syntaxHighlight: 'prism',
      remarkPlugins: [],
      rehypePlugins: [],
      remarkRehype: { footnoteLabel: '註解', footnoteBackLabel: '返回' },
      gfm: true,
    }),
    tailwind({
      configFile: './tailwind.config.cjs'
    })
  ],
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'directory'
  },
  markdown: {
    syntaxHighlight: 'prism',
    remarkPlugins: [remarkDirective],
    rehypePlugins: [rehypeRaw],
    shikiConfig: {
      theme: 'github-light',
      wrap: true
    },
    gfm: true,
    remarkRehype: { footnoteLabel: '註解', footnoteBackLabel: '返回' }
  }
});