import fp from "fastify-plugin";
import authModule from "./auth";
import offerModule from "./offer";

const appModules = fp(async (fastify) => {
	fastify.register(authModule);
	fastify.register(offerModule);
});

export default appModules;
