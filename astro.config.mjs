import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { fileURLToPath } from 'node:url';

// Astro configuration
// - Adds Vite aliases so imports like "@components/VideoCard" resolve in all environments (Linux on Vercel is case sensitive)
// - Makes output explicit as 'static' (default), which matches the project's current deployment model
const alias = {
  '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
  '@data': fileURLToPath(new URL('./src/data', import.meta.url)),
  '@styles': fileURLToPath(new URL('./src/styles', import.meta.url))
};

export default defineConfig({
  integrations: [react()],
  output: 'static',
  alias,
  vite: {
    resolve: { alias }
  },
  server: {
    host: true
  }
});
