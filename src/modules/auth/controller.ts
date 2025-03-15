import type { FastifyReply, FastifyRequest } from "fastify";
import type { LoginInput, RegisterInput } from "./schema";
import * as authService from "./service";
import httpStatus from "http-status";
import { APPLICATION_CONTEXT } from "@/config/application";
import { Role } from "@/config/role";

export const loginHandler = async (
	request: FastifyRequest<{ Body: LoginInput }>,
	reply: FastifyReply,
) => {
	// TODO: Extract into a middleware

	const applicationContext = request.headers["x-application-context"] as string;

	if (!applicationContext) {
		return reply.badRequest("Invalid or missing application context");
	}

	const response = await authService.login({
		app: request.server,
		data: request.body,
	});

	if (!response) return reply.unauthorized();
	
	reply
		.status(httpStatus.OK)
		.send({ tokens: response.tokens });
};

export const registerHandler = async (
	request: FastifyRequest<{ Body: RegisterInput }>,
	reply: FastifyReply,
) => {
	console.log("request.body.register", request.body);
	const response = await authService.register({
		app: request.server,
		data: request.body,
	});
	if (!response) return reply.unauthorized();

	return reply
		.status(httpStatus.CREATED)
		.send(response);
};

export const refreshHandler = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	try {
		await request.jwtVerify();

		if (!request.user) {
			throw request.server.httpErrors.unauthorized("Could not find user");
		}

		const response = await authService.refresh({
			app: request.server,
			user: request.user,
		});

		reply
			.status(httpStatus.OK)
			.send({ tokens: response.tokens });
	} catch (error) {
		reply.unauthorized("invalid refresh token");
	}
};
