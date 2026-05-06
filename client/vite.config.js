import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname),
  build: {
    outDir: "dist",
    // Strictly define the context to prevent access outside client folder
    rollupOptions: {
      external: (id) => {
        // Block any attempts to import from Server directory
        if (id.includes("Server") || id.includes("../../../Server")) {
          throw new Error(`❌ Forbidden import detected: ${id}. Frontend must NOT access backend files.`);
        }
        return false;
      },
    },
  },
  server: {
    // Prevent dev server from serving files outside client folder
    fs: {
      deny: ["../../Server"],
      allow: ["."],
    },
  },
});
