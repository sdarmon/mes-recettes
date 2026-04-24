import { defineConfig } from 'astro/config';

export default defineConfig({
  site: "https://recette.sashadarmon.fr",
  base: "/", // Reste à la racine du sous-domaine
  output: "hybrid",
});