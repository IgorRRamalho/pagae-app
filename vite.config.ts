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
        start_url: "/app",
        display: "standalone",
        orientation: "portrait",
        theme_color: "#7C3AED",
        background_color: "#F5F3FF",
        icons: [
          {
            src: "/pwa-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        navigateFallback: '/offline', 
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
