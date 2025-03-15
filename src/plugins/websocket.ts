import websocket, { type WebsocketPluginOptions } from "@fastify/websocket";
import fp from "fastify-plugin";

export default fp<WebsocketPluginOptions>(async (fastify, opts) => {
	fastify.register(websocket, {
		...opts,
	});
});
