// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['f98163cba279.ngrok-free.app'], // 👈 your ngrok URL
  },
})
