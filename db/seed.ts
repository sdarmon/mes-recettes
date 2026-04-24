import { db, Comment } from 'astro:db';

export default async function () {
  await db.insert(Comment).values([
    {
      postSlug: 'gateau_banane_chia',
      name: 'Jamie',
      email: 'jamie@turso.tech',
      message: 'Great post!',
      createdAt: new Date(),
    },
  ]);
}