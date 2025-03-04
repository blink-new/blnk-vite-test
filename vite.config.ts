import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    hmr: {
      clientPort: 443
    },
    allowedHosts: [
      '3000-ibawutnr6623fyex2ewe6-61cd78f3.blink.new',
      '.blink.new'
    ]
  }
})