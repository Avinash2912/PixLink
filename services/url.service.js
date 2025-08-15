
import { and, eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { urlsTable } from '../models/index.js';






export async function createShortUrl({ short_url, original_url, user_id }) {
  const [result] = await db
    .insert(urlsTable)
    .values({ short_url, original_url, user_id })
    .returning({ id: urlsTable.id, short_url: urlsTable.short_url, original_url: urlsTable.original_url });
  return result;
}




export async function getOriginalUrl(shortCode) {
  const [result] = await db
    .select({ original_url: urlsTable.original_url })
    .from(urlsTable)
    .where(eq(urlsTable.short_url, shortCode));
  return result?.original_url || null;
}



export async function getAllUrlsByUser(userId) {
  return await db
    .select()
    .from(urlsTable)
    .where(eq(urlsTable.user_id, userId));

}







export async function deleteUrlById(id, userId) {
  const [result] = await db
    .delete(urlsTable)
    .where(and(eq(urlsTable.id, id), eq(urlsTable.user_id, userId)))
    .returning({ short_url: urlsTable.short_url });
  return result;
}