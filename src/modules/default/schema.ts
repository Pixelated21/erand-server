import { offerInsertSchema, offerSelectSchema } from "@/database/schema";
import { createBaseRouteSchema } from "@/utils/schema";
import { buildJsonSchemas } from "fastify-zod";
import z from "zod";

// 1️⃣ Configuration for schema tagging
const SCHEMA_CONFIG = {
	tags: ["Offer"],
	schemaId: "offer",
};

// 2️⃣ Function to create tagged route schema
const createTaggedRouteSchema = (props = {}) =>
	createBaseRouteSchema({ tags: SCHEMA_CONFIG.tags, ...props });

// 3️⃣ **Request Schemas**
export const offerParamSchema = z.object({
	offerId: offerSelectSchema.shape.id,
});

export const createOfferSchema = offerInsertSchema.pick({
	price: true,
});

// 4️⃣ **Response Schemas**

// 5️⃣ **Export Types**
export type OfferParam = z.infer<typeof offerParamSchema>;
export type CreateOfferInput = z.infer<typeof createOfferSchema>;

// 6️⃣ **Route Schema Definitions**
export const offerRouteSchema = {
	list: createTaggedRouteSchema({
		description: "List all offers",
	}),
	listForCheckout: createTaggedRouteSchema({
		description: "List all offers for checkout",
	}),
	show: createTaggedRouteSchema({
		params: offerParamSchema,
		description: "Show offer",
	}),
	create: createTaggedRouteSchema({
		body: createOfferSchema,
		description: "Create offer",
	}),
	update: createTaggedRouteSchema({
		params: offerParamSchema,
		description: "Update offer",
	}),
	delete: createTaggedRouteSchema({
		params: offerParamSchema,
		description: "Delete offer",
	}),
};

// 7️⃣ **Build JSON Schemas for Fastify**
const models = {};

export const { schemas: offerSchemas, $ref } = buildJsonSchemas(models, {
	$id: SCHEMA_CONFIG.schemaId,
});
