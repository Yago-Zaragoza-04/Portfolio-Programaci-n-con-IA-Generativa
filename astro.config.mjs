import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Astro configuration
// - Adds Vite aliases so imports like "@components/VideoCard" resolve in all environments (Linux on Vercel is case sensitive)
// - Makes output explicit as 'static' (default), which matches the project's current deployment model
export default defineConfig({
  integrations: [react()],
  output: 'static',
  alias: {
    '@components': './src/components',
    '@data': './src/data',
    '@styles': './src/styles'
  },
  server: {
    host: true
  }
});
