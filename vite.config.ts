import { defineConfig } from "vite";

export default defineConfig(({ command }) => ({
  // Served from https://<user>.github.io/spiritdeck/ in production, but
  // from the domain root during local dev.
  base: command === "build" ? "/spiritdeck/" : "/",
  server: { host: "127.0.0.1", port: 5173, open: false },
  build: { target: "es2020" },
}));
