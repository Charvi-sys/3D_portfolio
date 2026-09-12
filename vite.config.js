import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path: on GitHub Actions the repo name is injected via GITHUB_REPOSITORY,
// so the site serves correctly under https://<user>.github.io/<repo>/ on GitHub
// Pages, while local `npm run dev` / `npm run preview` keep using '/'.
const base =
  process.env.BASE_URL ||
  (process.env.GITHUB_REPOSITORY ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/` : '/')

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