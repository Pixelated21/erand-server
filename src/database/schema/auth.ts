import { Role } from "@/config/role";
import { relations } from "drizzle-orm";
import * as t from "drizzle-orm/pg-core";
import { pgEnum, pgTable as table } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { timestamps } from "../helpers";

export const rolesEnum = pgEnum("role", [
	Role.ADMIN,
	Role.EMPLOYEE,
	Role.CUSTOMER,
]);

export const auth = table(
	"auth",
	{
		id: t.uuid().defaultRandom().primaryKey(),
		email: t.varchar({ length: 255 }).notNull().unique(),
		passwordHash: t.varchar({ length: 255 }).notNull(),
		roles: t.text().array().notNull().default([Role.CUSTOMER]),
		emailVerified: t.timestamp({ mode: "date" }),
		phoneNumberVerified: t.timestamp({ mode: "date" }),
		...timestamps,
	},
	(table) => [t.uniqueIndex("auth_email_idx").on(table.email)],
);

export const authRelations = relations(auth, ({ many, one }) => ({
}));

export const authSelectSchema = createSelectSchema(auth);
export const authInsertSchema = createInsertSchema(auth);

export type Auth = typeof auth.$inferSelect;
export type NewAuth = typeof auth.$inferInsert;
