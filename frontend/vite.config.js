import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Your App Name",
        short_name: "App",
        description: "Your App Description",
        start_url: "/",
        display: "standalone",
        theme_color: "#ffffff",
        background_color: "#ffffff",
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /\.(?:png|jpg|jpeg|gif|svg|webp|ico)$/, // Image file types
            handler: "NetworkFirst", // Use NetworkFirst strategy
            options: {
              cacheName: "image-cache",
              expiration: {
                maxAgeSeconds: 2 * 24 * 60 * 60, // Cache images for 2 days (in seconds)
              },
              networkTimeoutSeconds: 10, // Timeout for fetching if not cached
            },
          },
        ],
      },
    }),
  ],
});