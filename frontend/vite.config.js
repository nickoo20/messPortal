import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  server:{
    port:3000,
  },
  proxy:{
    "/api": {
      // target: "http://localhost:8080",
      target: process.env.BACKEND_URL || "http://localhost:8080",
      changeOrigin: true,
      secure:false,
    }
  },
}) ;
