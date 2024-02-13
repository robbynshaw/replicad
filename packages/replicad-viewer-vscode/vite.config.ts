import react from "@vitejs/plugin-react-swc";
import { resolve } from "node:path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/webview/main.tsx"),
      name: "vscode-viewer",
      // the proper extensions will be added
      fileName: "vscode-viewer",
    },
    sourcemap: true,
  },
  define: { "process.env.NODE_ENV": '"production"' },
  resolve: {
    dedupe: ["react", "react-dom"],
  },
});
