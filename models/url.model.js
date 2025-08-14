// models/url.model.js
import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

export const urlsTable = pgTable("urls", {
  id: uuid("id").primaryKey().defaultRandom(),
  original_url: varchar("original_url", { length: 2048 }).notNull(),
  short_url: varchar("short_url", { length: 255 }).notNull().unique(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  user_id: uuid("user_id"), // optional: link to users table
});
