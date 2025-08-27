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
        format: 'es',
        entryFileNames: 'assets/index.mjs', // Use .mjs extension for ES modules
        chunkFileNames: 'assets/index.mjs', // Use .mjs extension for ES modules
        assetFileNames: 'assets/[name].[ext]'
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
    // React (with SWC) plugin
    react(),

    // Lovable component tagger, only in dev
    mode === "development" && componentTagger(),

    // SVGR: import .svg as ReactComponent
    svgr({
      // optional SVGR options here
      // e.g. icon: true
    }),
  ].filter(Boolean),
  base: "/",
}));
