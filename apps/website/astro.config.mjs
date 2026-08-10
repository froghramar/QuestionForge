// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import rehypeMermaid from 'rehype-mermaid';
import { unified } from '@astrojs/markdown-remark';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  markdown: {
    syntaxHighlight: {
      type: 'shiki',
      excludeLangs: ['mermaid'],
    },
    processor: unified({
      rehypePlugins: [
        [rehypeMermaid, {
          strategy: 'inline-svg'
        }]
      ]
    })
  },

  vite: {
    plugins: [tailwindcss()]
  }
});