import rateLimit, { type FastifyRateLimitOptions } from "@fastify/rate-limit";
import fp from "fastify-plugin";

export default fp<FastifyRateLimitOptions>(
	async (fastify, opts) => {
		fastify.register(rateLimit, {
			max: 60,
			timeWindow: "1 minute",
			// redis: fastify.redis,
		});
	},
	{
		name: "rate-limit",
		// dependencies: ["redis"],   
	},
);
