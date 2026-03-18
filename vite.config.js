import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/salario-docente/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Salario Docente Universitario',
        short_name: 'SalarioDocente',
        description: 'Evolución del salario docente universitario argentino',
        theme_color: '#1e3a5f',
        background_color: '#0f172a',
        display: 'standalone',
        start_url: '/salario-docente/',
        icons: [
          { src: '/salario-docente/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/salario-docente/icon-512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ]
})
