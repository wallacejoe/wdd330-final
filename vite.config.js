import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        article: resolve(__dirname, "src/ArticlePage/articles.html"),
        favorites: resolve(__dirname, "src/FavoritesPage/favorites.html")
      },
    },
  },
});
