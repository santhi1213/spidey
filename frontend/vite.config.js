import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Ensure it binds to all network interfaces
    port: process.env.PORT || 3000, // Use the port Render assigns
    strictPort: true,  // Ensure the app only runs on the assigned port
  },
});
