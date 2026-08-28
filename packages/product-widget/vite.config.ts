import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "src/index.tsx",
      name: "ProductWidget",
      fileName: (format) => `product-widget.${format}.js`,
      formats: ["es", "umd"],
    },
    rollupOptions: { output: { exports: "named" } },
  },
});
