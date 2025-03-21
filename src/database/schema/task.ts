import { relations } from "drizzle-orm";
import * as t from "drizzle-orm/pg-core";
import { pgTable as table } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { timestamps } from "../helpers";
import { auth } from "./auth";
import { categories } from "./category";

export const task = table(
	"task",
	{
		id: t.uuid().defaultRandom().primaryKey(),
		user_id: t.uuid().notNull().references(() => auth.id),
		categoryId: t.uuid().references(() => categories.id),
		title: t.text().notNull(),
		description: t.text().notNull(),
		price: t.numeric().notNull(),
		longitude: t.numeric().notNull(),
		latitude: t.numeric().notNull(),    
		address: t.text().notNull(),
		images: t.jsonb().notNull(),
		...timestamps,
	},
);

export const taskRelations = relations(task, ({ one }) => ({
	user: one(auth, {
		fields: [task.user_id],
		references: [auth.id],
	}),
	category: one(categories, {
		fields: [task.categoryId],
		references: [categories.id],
	}),
}));

export const taskSelectSchema = createSelectSchema(task);
export const taskInsertSchema = createInsertSchema(task);

export type Task = typeof task.$inferSelect;
export type NewTask = typeof task.$inferInsert;
