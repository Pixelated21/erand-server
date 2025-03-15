import { relations } from "drizzle-orm";
import * as t from "drizzle-orm/pg-core";
import { pgTable as table } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { timestamps } from "../helpers";
import { auth } from "./auth";
import { task } from "./task";

export const review = table(
	"review",
	{
		id: t.uuid().defaultRandom().primaryKey(),
		taskId: t.uuid().notNull().references(() => task.id),
		taskerId: t.uuid().notNull().references(() => auth.id),
		rating: t.integer().notNull(),
		comment: t.text(),
		...timestamps,
	},
);

export const reviewRelations = relations(review, ({ one }) => ({
	task: one(task, {
		fields: [review.taskId],
		references: [task.id],
	}),
	tasker: one(auth, {
		fields: [review.taskerId],
		references: [auth.id],
	}),
}));

export const reviewSelectSchema = createSelectSchema(review);
export const reviewInsertSchema = createInsertSchema(review);

export type Review = typeof review.$inferSelect;
export type NewReview = typeof review.$inferInsert;
