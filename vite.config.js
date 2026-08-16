import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Multi-page build: the main app plus three standalone legal pages.
  // Each HTML file at the project root becomes its own entry in dist/.
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        notFound: './404.html',
        privacy: './privacy.html',
        terms: './terms.html',
        cookies: './cookies.html',
      },
    },
  },
})
