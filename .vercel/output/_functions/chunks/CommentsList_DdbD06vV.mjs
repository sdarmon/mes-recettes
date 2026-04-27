import { c as createComponent } from './astro-component_BAGjd9GD.mjs';
import 'piccolore';
import { m as maybeRenderHead, r as renderTemplate } from './transition_BZGvYEBH.mjs';
import 'clsx';
import { d as db, C as Comment } from './_astro_db_3ZfROtLd.mjs';
import { eq, desc } from '@astrojs/db/dist/runtime/virtual.js';

const $$CommentsList = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$CommentsList;
  const { postSlug } = Astro2.props;
  const comments = await db.select().from(Comment).where(eq(Comment.postSlug, postSlug)).orderBy(desc(Comment.createdAt));
  return renderTemplate`${maybeRenderHead()}<div class="space-y-4"> ${comments.length === 0 ? (
    /* Message affiché s'il n'y a pas de commentaires */
    renderTemplate`<div class="rounded border-2 border-dashed border-gray-200 p-8 text-center text-gray-500"> <p> 0 commentaire pour l'instant :(</p> </div>`
  ) : (
    /* Liste des commentaires s'il y en a */
    comments.map((comment) => renderTemplate`<div class="rounded bg-[#a4cf0a] p-4 text-gray-800"> <div class="font-bold">${comment.name}</div> <div class="text-sm text-gray-800"> ${comment.createdAt.toLocaleDateString()} </div> <div class="mt-2">${comment.message}</div> </div>`)
  )} </div>`;
}, "/home/sdarmon/Documents/site/mon-carnet-recettes/src/components/CommentsList.astro", void 0);

const $$file = "/home/sdarmon/Documents/site/mon-carnet-recettes/src/components/CommentsList.astro";
const $$url = undefined;

export { $$CommentsList as default, $$file as file, $$url as url };
