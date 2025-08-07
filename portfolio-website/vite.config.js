import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Portfolio/',     // ← must exactly match your repo name
  plugins: [react()]
})
