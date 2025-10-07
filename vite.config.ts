import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { execSync } from "child_process";
import dotenv from "dotenv";
import path from "path";

const __dirname = path.resolve();
dotenv.config({ path: path.resolve(__dirname, ".env") });

const buildVersion = execSync("git rev-parse --short HEAD").toString().trim();

export default defineConfig({
  plugins: [vue()],
  root: "./src",
  server: {
    port: 3000,
    strictPort: true,
    host: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".ogg", ".wav"],
  },
  define: {
    "import.meta.env.VITE_BUILD_VERSION": JSON.stringify(buildVersion),
  },
  assetsInclude: ["**/*.svg", "**/*.gltf", "**/*.glb", "**/*.png", "**/*.jpg"],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "/assets/styles/mixins.scss";`,
      },
    },
  },
  publicDir: "../public",
  build: {
    outDir: "../dist",
    sourcemap: false,
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        inlineDynamicImports: false,
        assetFileNames: "assets/[hash].[ext]",
        entryFileNames: "chunks/[name]-[hash].js",
        chunkFileNames: "chunks/[hash].js",
      },
    },
  },
});
