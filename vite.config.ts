import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Served from a sub-path on GitHub Pages (xdave-98.github.io/xavila_story/).
  // Stays "/" in dev. Runtime image paths are resolved via src/lib/asset.ts.
  base: '/xavila_story/',
  plugins: [react()],
  server: {
    // Forward /api calls to the tiny best-time backend during development.
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})
