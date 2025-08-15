// models/url.model.js
import { pgTable, uuid, varchar, timestamp, text } from "drizzle-orm/pg-core";
import { usersTable } from "../models/user.model.js";





export const urlsTable = pgTable("urls", {
  id: uuid("id").primaryKey().defaultRandom(),
  original_url: text("original_url", { length: 2048 }).notNull(),

  short_url: varchar("short_url", { length: 255 }).notNull().unique(),

  user_id: uuid("user_id").references(() => usersTable.id).notNull(),

  created_at: timestamp("created_at").notNull().defaultNow(),

  updated_at: timestamp("updated_at").$onUpdate(() => new Date()),
});
