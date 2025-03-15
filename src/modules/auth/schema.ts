import { createBaseRouteSchema } from "@/utils/schema";
import { createInsertSchema } from "drizzle-zod";
import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";
import { auth } from "@/database/schema/auth";

// 1️⃣ Configuration for schema tagging
const SCHEMA_CONFIG = { tags: ["Authentication"], schemaId: "auth" };

// 2️⃣ Function to create tagged route schema
const createTaggedRouteSchema = (props = {}) =>
	createBaseRouteSchema({ tags: SCHEMA_CONFIG.tags, ...props });

// 3️⃣ **Request Schemas**
export const registerSchema = createInsertSchema(auth, {
	email: (schema) => schema.email(),
})
	.pick({
		email: true,
		roles: true,
		emailVerified: true,
		phoneNumberVerified: true,
	})
	.extend({
		password: z.string().min(8),
	});

export const loginSchema = registerSchema.pick({
	email: true,
	password: true,
});

// 4️⃣ **Response Schemas**
export const authResponseSchema = z.object({
	tokens: z.object({
		accessToken: z.string(),
		refreshToken: z.string(),
		expires: z.date(),
	}),
});

export const refreshResponseSchema = z.object({
	accessToken: z.string(),
	refreshToken: z.string(),
});

// 5️⃣ **Export Types**
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

// 6️⃣ **Route Schema Definitions**
export const authRouteSchema = {
	login: createTaggedRouteSchema({
		description: "Login with email and password",
		body: loginSchema,
		response: { 200: authResponseSchema },
	}),
	register: createTaggedRouteSchema({
		description: "Register a new user",
		body: registerSchema,
		// response: { 201: authResponseSchema },
	}),
	refresh: createTaggedRouteSchema({
		description: "Refresh access token",
		// querystring: sessionQuerySchema,
		// body: refreshSchema,
	}),
};

// 7️⃣ **Build JSON Schemas for Fastify**
const models = {
	loginSchema,
	registerSchema,
	authResponseSchema,
	refreshResponseSchema,
};

export const { schemas: authSchemas, $ref } = buildJsonSchemas(models, {
	$id: SCHEMA_CONFIG.schemaId,
});
