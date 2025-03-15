import type { FastifyPluginAsync } from "fastify";
import * as authController from "./controller";
import { authRouteSchema } from "./schema";

const authRoutes: FastifyPluginAsync = async (fastify) => {
	fastify.post(
		"/login",
		{ schema: authRouteSchema.login },
		authController.loginHandler,
	);
	fastify.post(
		"/register",
		{ schema: authRouteSchema.register },
		authController.registerHandler,
	);
	fastify.post(
		"/refresh",
		{ schema: authRouteSchema.refresh },
		authController.refreshHandler,
	);
};

export default authRoutes;
