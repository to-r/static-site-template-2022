import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000,
  },
  build: {
    outDir: "site",
    rollupOptions: {
      input: "/src/assets/js/main.js",
      output: {
        entryFileNames: "assets/js/main.js",
        assetFileNames: "assets/css/[name].[ext]",
      },
    },
  },
});
