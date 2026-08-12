import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

export default defineConfig({
  base: isGitHubPages ? "/MuthuKumarKoodalingam/" : "/",
  plugins: [tsconfigPaths(), react(), tailwindcss()],
  root: "pages",
  build: {
    emptyOutDir: true,
    outDir: "../dist-pages",
  },
});
