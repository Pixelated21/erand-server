import fp from "fastify-plugin";
import authModule from "./auth";

const appModules = fp(async (fastify) => {
	fastify.register(authModule);
});

export default appModules;
