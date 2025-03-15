import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { Server, type ServerOptions } from "socket.io";

export type FastifySocketIoOptions = Partial<ServerOptions> & {
	preClose?: (done: () => void) => void;
};

export default fp(async (fastify, opts: FastifySocketIoOptions) => {
	function defaultPreClose(done: () => void) {
		fastify.io.local.disconnectSockets(true);
		done();
	}

	fastify.decorate("io", new Server(fastify.server, opts));
	fastify.addHook("preClose", (done) => {
		if (opts.preClose) {
			return opts.preClose(done);
		}
		return defaultPreClose(done);
	});
	fastify.addHook("onClose", (fastify: FastifyInstance, done) => {
		fastify.io.close();
		done();
	});
});
