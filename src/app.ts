import type { FastifyServerOptions } from "fastify";
import { type FastifyInstance, fastify } from "fastify";
import { env } from "./env";
import appModules from "./modules";
import cors from "./plugins/cors";
import database from "./plugins/database";
import healthcheck from "./plugins/healthcheck";
import helmet from "./plugins/helmet";
import jwt from "./plugins/jwt";
import rateLimit from "./plugins/rate-limit";
import sensible from "./plugins/sensible";
import socketIo from "./plugins/socket-io";
import swagger from "./plugins/swagger";
import websocket from "./plugins/websocket";
import zodTypeProvider from "./plugins/zod-type-provider";
import { envToConfig } from "./utils/config";
import dotenv from "dotenv";

dotenv.config();

const registerCorePlugins = async (fastify: FastifyInstance) => {
	fastify.register(helmet);
	fastify.register(cors);
	// fastify.register(redis);
	fastify.register(websocket);
	fastify.register(rateLimit);
	fastify.register(database);
	fastify.register(healthcheck);
	fastify.register(socketIo);
	fastify.register(sensible);
	fastify.register(swagger);
	fastify.register(jwt);
	fastify.register(zodTypeProvider);
};

const registerModule = async (fastify: FastifyInstance) => {
	await fastify.register(appModules);
};

export async function buildFastify(options?: FastifyServerOptions) {
	const app = fastify({
		...envToConfig[env.NODE_ENV ?? "development"],
		...options,
	});

	await registerCorePlugins(app);
	await registerModule(app);

	return app;
}
