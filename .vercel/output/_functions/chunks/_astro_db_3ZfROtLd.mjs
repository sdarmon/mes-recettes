import { asDrizzleTable } from '@astrojs/db/runtime';
import { createClient } from '@astrojs/db/db-client/libsql-node.js';
import '@astrojs/db/dist/runtime/virtual.js';

const db = await createClient({
  url: "libsql://recette-sasha-sdarmon.aws-eu-west-1.turso.io",
  token: process.env.ASTRO_DB_APP_TOKEN ?? "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzcwMzA5NjgsImlkIjoiMDE5ZGJmNGMtMTkwMS03ODhhLWJkNmUtN2EyYjI4YjczOWU3IiwicmlkIjoiNWIyZTRhYzYtMmE5MC00MzU2LTk4YjktYWVjOTI5ODQxZThlIn0.NHCInW6320pEoh4s-0dsX1TRxk2yfWJPdQLzupRIpCDcrZC-1bxvEn-u3qe-3l2BnwVKoMThT1bAhWHSU1NzBw"
});
const Comment = asDrizzleTable("Comment", { "columns": { "id": { "type": "number", "schema": { "unique": false, "deprecated": false, "name": "id", "collection": "Comment", "primaryKey": true } }, "postSlug": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "postSlug", "collection": "Comment", "primaryKey": false, "optional": false } }, "name": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "name", "collection": "Comment", "primaryKey": false, "optional": false } }, "email": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "email", "collection": "Comment", "primaryKey": false, "optional": true } }, "message": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "message", "collection": "Comment", "primaryKey": false, "optional": false } }, "createdAt": { "type": "date", "schema": { "optional": false, "unique": false, "deprecated": false, "name": "createdAt", "collection": "Comment", "default": "2026-04-27T13:27:55.901Z" } } }, "deprecated": false, "indexes": {} }, false);

export { Comment as C, db as d };
