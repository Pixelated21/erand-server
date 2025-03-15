import { env } from "@/env";
import closeWithGrace from "close-with-grace";
import { buildFastify } from "./app";

const server = await buildFastify();

closeWithGrace(
	{ delay: Number(env.FASTIFY_CLOSE_GRACE_DELAY) },
	async ({ err }) => {
		if (err) {
			server.log.error(err);
		}
		await server.close();
	},
);

server.listen({ port: Number(env.PORT), host: env.HOST }, (err) => {
	if (err) {
		server.log.error(err);
		process.exit(1);
	}
});
