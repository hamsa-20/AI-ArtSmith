import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

export default defineConfig({
  plugins: [
    react(),
    NodeGlobalsPolyfillPlugin({
      buffer: true
    })
  ],
  define: {
    global: 'globalThis',
    'process.env': {},
    Buffer: ['buffer', 'Buffer']
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api.replicate.com',  // The external API
        changeOrigin: true,                   // Change the origin to match the target
        rewrite: (path) => path.replace(/^\/api/, ''),  // Remove '/api' prefix from the request
      },
    },
  },
})
