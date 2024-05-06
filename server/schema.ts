import { pgTable, text } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
  id: text('id').primaryKey().notNull(),
  name: text('name')
})