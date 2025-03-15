import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {
		NODE_ENV: z
			.enum(["development", "test", "production"])
			.default("development"),
		PORT: z.coerce.number().default(3001),
		FASTIFY_CLOSE_GRACE_DELAY: z.coerce.number().default(5000),
		HOST: z.string().default("0.0.0.0"),
		DATABASE_URL: z.string().url(),
		JWT_SECRET: z.string().min(32),
		REDIS_URL: z.string().url(),
		RESEND_API_KEY: z.string().min(1),
	},
	runtimeEnv: process.env,
});
