import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // ✅ Required for correct routing & asset loading on Vercel
  plugins: [react()],
})
