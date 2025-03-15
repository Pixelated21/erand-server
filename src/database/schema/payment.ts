import { relations } from "drizzle-orm";
import * as t from "drizzle-orm/pg-core";
import { pgTable as table } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { timestamps } from "../helpers";
import { auth } from "./auth";
import { task } from "./task";

export const PaymentStatus = {
  PENDING: "pending",
  COMPLETED: "completed",
  FAILED: "failed",
  REFUNDED: "refunded",
} as const;

export const payments = table(
  "payments",
  {
    id: t.uuid().defaultRandom().primaryKey(),
    taskId: t.uuid().notNull().references(() => task.id),
    payerId: t.uuid().notNull().references(() => auth.id),
    payeeId: t.uuid().notNull().references(() => auth.id),
    amount: t.decimal().notNull(),
    status: t.text().notNull().default(PaymentStatus.PENDING),
    transactionId: t.varchar({ length: 255 }),
    ...timestamps,
  },
);

export const paymentRelations = relations(payments, ({ one }) => ({
  task: one(task, {
    fields: [payments.taskId],
    references: [task.id],
  }),
  payer: one(auth, {
    fields: [payments.payerId],
    references: [auth.id],
  }),
  payee: one(auth, {
    fields: [payments.payeeId],
    references: [auth.id],
  }),
}));

export const paymentSelectSchema = createSelectSchema(payments);
export const paymentInsertSchema = createInsertSchema(payments);

export type Payment = typeof payments.$inferSelect;
export type NewPayment = typeof payments.$inferInsert; 