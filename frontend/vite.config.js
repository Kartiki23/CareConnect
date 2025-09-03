import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss()],  // ✅ must be inside []
  base: "/CareConnect/",     // ✅ repo name, case-sensitive
})
