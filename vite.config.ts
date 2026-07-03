import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Custom domain (www.sichonengineering.com) is served from the root.
export default defineConfig({
  base: '/',
  plugins: [react()],
})
