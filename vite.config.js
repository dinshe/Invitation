import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// Relative base path ('./') allows the site to work seamlessly on any GitHub Pages URL or custom domain.
export default defineConfig({
  plugins: [react()],
  base: '/Invitation/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
