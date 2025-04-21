import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "PagAê! - Gerenciador de Dívidas Divertido",
        short_name: "PagAê!",
        description:
          "Transforme cobranças em brincadeiras entre amigos com nosso gerenciador descontraído de dívidas",
        start_url: "/?source=pwa",
        display: "standalone",
        orientation: "portrait",
        theme_color: "#111827",
        background_color: "#111827",
        categories: ["finance", "social"],
        icons: [
          {
            src: "/apple-icon-57x57.png",
            sizes: "57x57",
            type: "image/png",
          },
          {
            src: "/apple-icon-60x60.png",
            sizes: "60x60",
            type: "image/png",
          },
          {
            src: "/apple-icon-72x72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "/apple-icon-76x76.png",
            sizes: "76x76",
            type: "image/png",
          },
          {
            src: "/apple-icon-114x114.png",
            sizes: "114x114",
            type: "image/png",
          },
          {
            src: "/apple-icon-120x120.png",
            sizes: "120x120",
            type: "image/png",
          },
          {
            src: "/apple-icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "/apple-icon-152x152.png",
            sizes: "152x152",
            type: "image/png",
          },
          {
            src: "/apple-icon-180x180.png",
            sizes: "180x180",
            type: "image/png",
          },
    
          // Android & favicon sizes
          {
            src: "/android-icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/favicon-96x96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "/favicon-32x32.png",
            sizes: "32x32",
            type: "image/png",
          },
          {
            src: "/favicon-16x16.png",
            sizes: "16x16",
            type: "image/png",
          },
    
          // Maskable icons (pra atalhos e homescreen)
          {
            src: "/pwa-assets/manifest-icon-192.maskable.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/pwa-assets/manifest-icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },

      workbox: {
        navigateFallback: "/offline.html",
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2,woff,ttf}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.(gstatic|googleapis)\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts",
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
          {
            urlPattern: /^https:\/\/firestore\.googleapis\.com\/.*/i,
            handler: "NetworkOnly",
            options: {
              backgroundSync: {
                name: "firestore-queue",
                options: { maxRetentionTime: 24 * 60 },
              },
            },
          },
          {
            urlPattern: /^https:\/\/assets\.pagaê\.com\/.*/i,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "assets-cache",
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
          {
            urlPattern: /\/api\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              networkTimeoutSeconds: 3,
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 5 },
            },
          },
        ],
      },
      devOptions: {
        enabled: false,
        type: "module",
        navigateFallback: "index.html",
      },
    }),
  ],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@components/Auth": path.resolve(__dirname, "src/components/Auth"),
      "@contexts": path.resolve(__dirname, "src/contexts"),
      "@hook": path.resolve(__dirname, "src/hook"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@public": path.resolve(__dirname, "src/public"),
      "@template": path.resolve(__dirname, "src/template"),
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
