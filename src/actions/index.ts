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
};
