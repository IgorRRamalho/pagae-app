import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@components/Auth': path.resolve(__dirname, 'src/components/Auth'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
      '@hook': path.resolve(__dirname, 'src/hook'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@public': path.resolve(__dirname, 'src/public'),
      '@template': path.resolve(__dirname, 'src/template')
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react']
  }
});
