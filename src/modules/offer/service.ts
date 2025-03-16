import type { AuthenticatedRequestContext } from "@/types/service";
import type { CreateOfferInput, OfferParam } from "./schema";

export const listOffers = async ({
	app,
	user,
}: AuthenticatedRequestContext) => {
	if (!user) throw app.httpErrors.unauthorized();

	try {
		console.log("user", user);
	} catch (error) {
		app.log.error(`Error listing offers: ${error}`);
		throw app.httpErrors.internalServerError("Failed to list offers");
	}
};

export const listOffersForCheckout = async ({
	app,
	user,
}: AuthenticatedRequestContext) => {
	if (!user) throw app.httpErrors.unauthorized();

	try {
		console.log("user", user);
	} catch (error) {
		app.log.error(`Error listing offers: ${error}`);
		throw app.httpErrors.internalServerError("Failed to list offers");
	}
};

export const showOffer = async ({
	app,
	user,
	params,
}: AuthenticatedRequestContext<OfferParam>) => {
	if (!params) throw app.httpErrors.badRequest("Order ID is required");
	if (!user) throw app.httpErrors.unauthorized();

	try {
		console.log("user", user);
	} catch (error) {
		app.log.error(`Error showing offer: ${error}`);
		throw app.httpErrors.internalServerError("Failed to show offer");
	}
};

export const createOffer = async ({
	app,
	user,
	data,
}: AuthenticatedRequestContext<never, CreateOfferInput>) => {
	if (!user) throw app.httpErrors.unauthorized();
	if (!data) throw app.httpErrors.badRequest("Data is required");

	try {
		console.log("user", user);
	} catch (error) {
		app.log.error(`Error creating offer: ${error}`);
		throw app.httpErrors.internalServerError("Failed to create offer");
	}
};

export const updateOffer = async ({
	app,
	user,
	params,
}: AuthenticatedRequestContext<OfferParam>) => {
	if (!params) throw app.httpErrors.badRequest("Offer ID is required");
	if (!user) throw app.httpErrors.unauthorized();

	try {
		console.log("user", user);
	} catch (error) {
		app.log.error(`Error updating offer: ${error}`);
		throw app.httpErrors.internalServerError("Failed to update offer");
	}
};

export const deleteOffer = async ({
	app,
	user,
	params,
}: AuthenticatedRequestContext<OfferParam>) => {
	if (!params) throw app.httpErrors.badRequest("Offer ID is required");
	if (!user) throw app.httpErrors.unauthorized();

	try {
		console.log("user", user);
	} catch (error) {
		app.log.error(`Error deleting offer: ${error}`);
		throw app.httpErrors.internalServerError("Failed to delete offer");
	}
};
