import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
        format: 'es', // Use ES modules like the working gh-pages branch
        entryFileNames: 'assets/[name]-[hash].js', // Standard .js with hash
        chunkFileNames: 'assets/[name]-[hash].js', // Standard .js with hash
        assetFileNames: 'assets/[name]-[hash].[ext]'
      },
    },
    target: 'esnext',
    modulePreload: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    svgr({}),
  ].filter(Boolean),
  base: "/", // Use absolute paths like the working gh-pages branch
}));
