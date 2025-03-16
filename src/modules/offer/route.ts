import type { FastifyPluginAsync } from "fastify";
import * as offerController from "./controller";
import { offerRouteSchema } from "./schema";

const offerRoutes: FastifyPluginAsync = async (fastify) => {
	fastify.addHook("preHandler", fastify.authenticate);

	fastify.get(
		"/",
		{ schema: offerRouteSchema.list },
		offerController.listOffersHandler,
	);
	fastify.get(
		"/checkout",
		{ schema: offerRouteSchema.listForCheckout },
		offerController.listOffersForCheckoutHandler,
	);
	fastify.get(
		"/:offerId",
		{ schema: offerRouteSchema.show },
		offerController.showOfferHandler,
	);
	fastify.post(
		"/",
		{ schema: offerRouteSchema.create },
		offerController.createOfferHandler,
	);
	fastify.put(
		"/:offerId",
		{ schema: offerRouteSchema.update },
		offerController.updateOfferHandler,
	);
	fastify.delete(
		"/:offerId",
		{ schema: offerRouteSchema.delete },
		offerController.deleteOfferHandler,
	);
};

export default offerRoutes;
