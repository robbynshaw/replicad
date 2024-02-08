import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // optimizeDeps: {
  //   exclude: ["replicad-react"],
  // },
  resolve: {
    dedupe: ["react", "react-dom"],
  },
});