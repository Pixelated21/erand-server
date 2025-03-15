import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {
		NODE_ENV: z
			.enum(["development", "test", "production"])
			.default("development"),
		PORT: z.coerce.number().default(3001),
		EMAIL_DOMAIN: z.string().min(1),
		FASTIFY_CLOSE_GRACE_DELAY: z.coerce.number().default(5000),
		HOST: z.string().default("0.0.0.0"),
		DB_MIGRATING: z.coerce.boolean().default(false),
		DB_SEEDING: z.coerce.boolean().default(false),
		DATABASE_URL: z.string().url(),
		COOKIE_SECRET: z.string().min(32),
		JWT_SECRET: z.string().min(32),
		REDIS_URL: z.string().url(),
		RESEND_API_KEY: z.string().min(1),
		WAREHOUSE_API_URL: z.string().url(),
	},
	runtimeEnv: process.env,
});
