import fp from "fastify-plugin";
import cors, { type FastifyCorsOptions } from "@fastify/cors";

export default fp<FastifyCorsOptions>(async (fastify, opts) => {
	fastify.register(cors, {
		origin: ["pcs-ja-client.vercel.app"],
		credentials: true,
		...opts,
	});
});
