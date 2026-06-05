import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Forward /api calls to the tiny best-time backend during development.
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})
