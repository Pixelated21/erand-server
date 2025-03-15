import { relations } from "drizzle-orm";
import * as t from "drizzle-orm/pg-core";
import { pgTable as table } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { timestamps } from "../helpers";
import { task } from "./task";

export const categories = table(
  "categories",
  {
    id: t.uuid().defaultRandom().primaryKey(),
    name: t.varchar({ length: 100 }).notNull(),
    description: t.text(),
    icon: t.varchar({ length: 255 }),
    ...timestamps,
  },
);

export const categoryRelations = relations(categories, ({ many }) => ({
  tasks: many(task),
}));

export const categorySelectSchema = createSelectSchema(categories);
export const categoryInsertSchema = createInsertSchema(categories);

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert; 