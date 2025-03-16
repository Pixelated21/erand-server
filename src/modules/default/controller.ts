import type { FastifyReply, FastifyRequest } from "fastify";
import {
	createOffer,
	deleteOffer,
	updateOffer,
	showOffer,
	listOffers,
	listOffersForCheckout,
} from "./service";
import type { OfferParam, CreateOfferInput } from "./schema";
import httpStatus from "http-status";

export const listOffersHandler = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const response = await listOffers({
		app: request.server,
		user: request.user,
	});
	return reply.status(httpStatus.OK).send(response);
};

export const listOffersForCheckoutHandler = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const response = await listOffersForCheckout({
		app: request.server,
		user: request.user,
	});
	return reply.status(httpStatus.OK).send(response);
};

export const showOfferHandler = async (
	request: FastifyRequest<{ Params: OfferParam }>,
	reply: FastifyReply,
) => {
	const response = await showOffer({
		app: request.server,
		params: request.params,
		user: request.user,
	});
	return reply.status(httpStatus.OK).send(response);
};

export const createOfferHandler = async (
	request: FastifyRequest<{ Body: CreateOfferInput }>,
	reply: FastifyReply,
) => {
	const response = await createOffer({
		app: request.server,
		data: request.body,
		user: request.user,
	});
	return reply.status(httpStatus.CREATED).send(response);
};

export const updateOfferHandler = async (
	request: FastifyRequest<{ Params: OfferParam }>,
	reply: FastifyReply,
) => {
	const response = await updateOffer({
		app: request.server,
		params: request.params,
		user: request.user,
	});
	return reply.status(httpStatus.OK).send(response);
};

export const deleteOfferHandler = async (
	request: FastifyRequest<{ Params: OfferParam }>,
	reply: FastifyReply,
) => {
	const response = await deleteOffer({
		app: request.server,
		params: request.params,
		user: request.user,
	});
	return reply.status(httpStatus.NO_CONTENT).send(response);
};
