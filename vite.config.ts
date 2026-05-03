import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  // This allows Vite to see everything in the project
  root: './', 
  resolve: {
    alias: {
      // Direct map to ensure Lit is always found
      'lit': path.resolve(__dirname, 'node_modules/lit'),
      'lit/decorators.js': path.resolve(__dirname, 'node_modules/lit/decorators.js'),
    }
  },
server: {
    // Force it to open your new flat index
    open: 'output_src/index.html',
    fs: {
      allow: ['.'] 
    }
  },
  build: {
    // When you're ready for Cloudflare, this tells Vite where the entry point is
    rollupOptions: {
      input: path.resolve(__dirname, 'output_src/index.html')
    }
  }
});
