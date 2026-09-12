import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path: GitHub Pages serves the site from https://Charvi-sys.github.io/3D_portfolio/
// In CI the repo name is injected automatically; for local builds (npm run deploy
// via the gh-pages package) we fall back to the repo name so assets get the
// /3D_portfolio/ prefix. Override any time with BASE_URL (e.g. a custom domain).
const base =
  process.env.BASE_URL ||
  (process.env.GITHUB_REPOSITORY
    ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
    : '/3D_portfolio/')

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1800,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          gsap: ['gsap'],
        },
      },
    },
  },
})