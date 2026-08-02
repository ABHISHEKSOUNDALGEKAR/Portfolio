import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vercel is the primary deployment target, so we serve from the domain root.
// (If you ever redeploy the old GitHub Pages project page instead, override
// with `vite build --base=/Portfolio/`.)
export default defineConfig({
  base: "/",
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ["framer-motion"],
        },
      },
    },
  },
});
