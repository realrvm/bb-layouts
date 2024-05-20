import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import UnpluginInjectPreload from "unplugin-inject-preload/vite";

// PROXY используется только для DEVELOPMENT стенда
// Провести ресёрч на тему корректной реализации нескольких конфигов или задания через переменные окружения

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    UnpluginInjectPreload({
      injectTo: "head",
      files: [
        {
          entryMatch: /.*\.(png|svg)$/,
          outputMatch: /.*\.(png|svg)$/,
        },
      ],
    }),
  ],
  server: {
    proxy: {
      '/api/v1': {
        target: 'http://api.onelinelater.ru/',
        changeOrigin: true,
      },
    },
  },
});
