import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  },
  build: {
    target: 'es2020',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-three': ['three'],
          'vendor-motion': ['framer-motion', 'lenis'],
          'vendor-icons': ['lucide-react', 'canvas-confetti'],
          'vendor-supabase': ['@supabase/supabase-js']
        }
      }
    }
  }
});
