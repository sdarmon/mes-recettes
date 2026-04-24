import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { db, Comment } from "astro:db";

export const server = {
  addComment: defineAction({
    accept: "form",
    input: z.object({
      postSlug: z.string(),
      name: z.string().min(1, "Le nom est requis"),
      email: z.string().email().or(z.literal("")).optional(),
      message: z.string().min(1, "Le message ne peut pas être vide"),
    }),
    handler: async input => {
      // On ne mentionne PAS 'id' ici, la DB s'en occupe
      const comment = await db
        .insert(Comment)
        .values({
          postSlug: input.postSlug,
          name: input.name,
          email: input.email || null,
          message: input.message,
          createdAt: new Date(),
        })
        .returning();

      return comment[0];
    },
  }),


  addRecipe: defineAction({
    accept: "form",
    input: z.object({
      adminKey: z.string(),
      author: z.string().min(1),
      title: z.string().min(5),
      description: z.string().min(10),
      tags: z.string(),
      personnes: z.coerce.number(), // On force la conversion en nombre
      unite: z.string(), // "personnes", "pizzas", "pâtes", etc.
      content: z.string().min(20),
    }),
    handler: async input => {
      if (input.adminKey !== process.env.ADMIN_SECRET_KEY) {
        throw new Error("Interdit");
      }

      const slug = input.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .trim();

      const mdxContent = `---
  author: "${input.author.replace(/"/g, "'")}"
  pubDatetime: ${new Date().toISOString()}
  title: "${input.title.replace(/"/g, "'")}"
  featured: false
  draft: false
  personnes: ${input.personnes}
  unite: "${input.unite.replace(/"/g, "'")}"
  tags:
  ${input.tags
    .split(",")
    .map(tag => `  - ${tag.trim()}`)
    .join("\n")}
  description: "${input.description.replace(/"/g, "'")}"
  ---

  ${input.content}`;

      const path = `src/data/blog/fan/${slug}.mdx`;

      const response = await fetch(
        `https://api.github.com/repos/${process.env.GITHUB_REPO}/contents/${path}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            "Content-Type": "application/json",
            "User-Agent": "Astro-App",
          },
          body: JSON.stringify({
            message: `Nouvelle recette : ${input.title}`,
            content: Buffer.from(mdxContent).toString("base64"),
          }),
        }
      );

      if (!response.ok) throw new Error("Erreur GitHub API");
      return { success: true };
    },
  }),
};
