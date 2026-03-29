import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Tells Vite to prefix all asset paths with the repo name
  // Without this, assets load from / instead of /Projects_portfolio/
  base: '/Projects_portfolio/',
  plugins: [react()],
})