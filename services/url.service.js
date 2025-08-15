import { eq } from 'drizzle-orm';

// services/url.service.js
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
