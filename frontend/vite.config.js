import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    host: '0.0.0.0',
    port: 4173,
    allowedHosts: [
      'gen-ai-interior-frontend.onrender.com',
      '.onrender.com'
    ]
  },
  server: {
    host: '0.0.0.0',
    port: 5173
  }
})
