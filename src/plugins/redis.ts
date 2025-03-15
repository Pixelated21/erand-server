import { env } from "@/env";
import redis, { type FastifyRedisPluginOptions } from "@fastify/redis";
import fp from "fastify-plugin";

export default fp<FastifyRedisPluginOptions>(
	async (fastify, opts) => {
		try {
			await fastify.register(redis, {
				url: env.REDIS_URL,
				closeClient: true,
				connectTimeout: 5000,
				maxRetriesPerRequest: 3,
				...opts,
			});

			await fastify.redis.ping();
			fastify.log.info("Redis connection established");
		} catch (err) {
			fastify.log.error("Redis connection failed:", err);
		}
	},
	{
		name: "redis",
		dependencies: [],
	},
);
