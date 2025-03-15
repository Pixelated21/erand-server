import * as schema from "@/database/schema";
import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { env } from "@/env";
import postgres from "postgres";

export type Database = PostgresJsDatabase<typeof schema>;

const databasePlugin: FastifyPluginAsync = async (fastify: FastifyInstance) => {
	const client = postgres(env.DATABASE_URL);

	const db = drizzle(client, {
		schema,
		logger: env.NODE_ENV === "development",
		casing: "snake_case",
	});

	fastify.decorate("db", db);

	fastify.addHook("onClose", async (instance) => {
		await client.end();
	});
};

export default fp(databasePlugin, { name: "database" });
