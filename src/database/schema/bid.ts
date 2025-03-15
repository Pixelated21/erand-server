import { relations } from "drizzle-orm";
import * as t from "drizzle-orm/pg-core";
import { pgTable as table } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { timestamps } from "../helpers";
import { auth } from "./auth";
import { task } from "./task";

export const BidStatus = {
  PENDING: "pending",
  ACCEPTED: "accepted", 
  REJECTED: "rejected",
  COUNTERED: "countered",
  WITHDRAWN: "withdrawn",
} as const;

export const bids = table(
  "bids",
  {
    id: t.uuid().defaultRandom().primaryKey(),
    taskId: t.uuid().notNull().references(() => task.id),
    bidderId: t.uuid().notNull().references(() => auth.id),
    amount: t.decimal().notNull(),
    message: t.text(),
    status: t.text().notNull().default(BidStatus.PENDING),
    parentBidId: t.uuid().references((): t.AnyPgColumn => bids.id), // For counter offers
    isCounterOffer: t.boolean().notNull().default(false),
    counterOfferedBy: t.uuid().references(() => auth.id), // Who made the counter offer
    ...timestamps,
  },
);

export const bidRelations = relations(bids, ({ one, many }) => ({
  task: one(task, {
    fields: [bids.taskId],
    references: [task.id],
  }),
  bidder: one(auth, {
    fields: [bids.bidderId],
    references: [auth.id],
  }),
  counterOfferBy: one(auth, {
    fields: [bids.counterOfferedBy],
    references: [auth.id],
  }),
  parentBid: one(bids, {
    fields: [bids.parentBidId],
    references: [bids.id],
  }),
  counterOffers: many(bids, { relationName: "counterOffers" }),
}));

export const bidSelectSchema = createSelectSchema(bids);
export const bidInsertSchema = createInsertSchema(bids);

export type Bid = typeof bids.$inferSelect;
export type NewBid = typeof bids.$inferInsert;
