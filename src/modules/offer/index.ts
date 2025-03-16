import type { FastifyPluginAsync } from "fastify";
import offerRoutes from "./route";
import { offerSchemas } from "./schema";

const offerModule: FastifyPluginAsync = async (fastify) => {
	for (const schema of [...offerSchemas]) {
		fastify.addSchema(schema);
	}

	fastify.register(offerRoutes, { prefix: "/offers" });
};

export default offerModule;
