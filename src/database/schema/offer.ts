import { Role } from "@/config/role";
import { relations } from "drizzle-orm";
import * as t from "drizzle-orm/pg-core";
import { pgEnum, pgTable as table } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { timestamps } from "../helpers";
import { auth } from "./auth";
import { task } from "./task";

export const offers = table(
	"offers",
	{
		id: t.uuid().defaultRandom().primaryKey(),
		taskId: t.uuid().notNull().references(() => task.id),
		taskerId: t.uuid().notNull().references(() => auth.id),
		price: t.integer().notNull(),
		message: t.text(),
		status: t.text("status").default("pending"), // 'pending', 'accepted', 'rejected'
		...timestamps,
	},
);

export const offerRelations = relations(offers, ({ one }) => ({
	task: one(task, {
		fields: [offers.taskId],
		references: [task.id],
	}),
	tasker: one(auth, {
		fields: [offers.taskerId],
		references: [auth.id],
	}),
}));

export const offerSelectSchema = createSelectSchema(offers);
export const offerInsertSchema = createInsertSchema(offers);

export type Offer = typeof offers.$inferSelect;
export type NewOffer = typeof offers.$inferInsert;
