import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  // During `npm run dev` (serve) use “/” so assets load locally.
  // During `npm run build` use “/Portfolio/” so GitHub Pages finds them.
  base: command === 'serve' ? '/' : '/Portfolio/',
  plugins: [react()]
}));
