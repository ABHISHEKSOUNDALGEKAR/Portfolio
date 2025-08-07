import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/portfolio-website/',   // if deploying to GH Pages under /portfolio-website/
  plugins: [ react() ],
});
