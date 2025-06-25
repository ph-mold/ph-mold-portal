import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { createHtmlPlugin } from "vite-plugin-html";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      react(),
      tailwindcss(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            apiUrl: env.VITE_API_URL,
            fileUrl: env.VITE_IMAGE_BASE_URL.replace("/contents", ""),
          },
        },
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    base: "./",
    build: {
      outDir: "dist-react",
    },
    server: {
      port: 5123,
      strictPort: true,
      host: "0.0.0.0",
      disableHostCheck: true,
    },
  };
});
