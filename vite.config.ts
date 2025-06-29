import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    open: true,

    proxy: {
      "/nid/naver": {
        target: "https://nid.naver.com",
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/nid\/naver/, ""),
      },
      "/openapi/naver": {
        target: "https://openapi.naver.com",
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/openapi\/naver/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
