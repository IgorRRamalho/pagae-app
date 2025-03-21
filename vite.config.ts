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
        start_url: "/",
        display: "standalone",
        orientation: "portrait",
        theme_color: "#111827",
        background_color: "#F5F3FF",
        icons: [
          // Ícones maskable
          {
            src: "/icons/maskable_icon_x48.png",
            sizes: "48x48",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "/icons/maskable_icon_x72.png",
            sizes: "72x72",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "/icons/maskable_icon_x96.png",
            sizes: "96x96",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "/icons/maskable_icon_x128.png",
            sizes: "128x128",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "/icons/maskable_icon_x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable" // Combinado
          },
          {
            src: "/icons/maskable_icon_x384.png",
            sizes: "384x384",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "/icons/maskable_icon_x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable" // Combinado
          }
        ],
      },
      workbox: {
        navigateFallback: "/offline",
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
          {
            urlPattern: /^https:\/\/firestore\.googleapis\.com\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "firestore-cache",
              networkTimeoutSeconds: 10,
            },
          },
          {
            urlPattern: /^https:\/\/assets\.pagaê\.com\/emojis\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "emojis-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
          {
            urlPattern: /\/app.*/,
            handler: "NetworkFirst",
            options: {
              cacheName: "app-routes-cache",
              networkTimeoutSeconds: 3,
            },
          },
        ],
      },
      devOptions: {
        enabled: true,
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
