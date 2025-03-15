import type { FastifyPluginAsync } from "fastify";
import authRoutes from "./route";
import { authSchemas } from "./schema";

const authModule: FastifyPluginAsync = async (fastify) => {
	for (const schema of [...authSchemas]) {
		fastify.addSchema(schema);
	}

	fastify.register(authRoutes, { prefix: "/auth" });
};

export default authModule;
