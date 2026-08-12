import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";

// Build de un solo archivo HTML, únicamente para generar un preview autocontenido.
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  define: {
    __USE_HASH_ROUTER__: JSON.stringify("true"),
  },
  build: {
    target: "es2020",
    cssCodeSplit: false,
    assetsInlineLimit: 100000000,
    outDir: "dist-preview",
  },
});
