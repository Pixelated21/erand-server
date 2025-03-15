import { env } from "@/env";
import jwt from "@fastify/jwt";
import type { FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";

export type JwtPayload = {
	id: string;
	email: string;
	roles: string[];
	emailVerified: Date | null;
	phoneNumberVerified: Date | null;
};

export type JwtUser = {
	id: string;
	email: string;
	roles: string[];
	emailVerified: Date | null;
	phoneNumberVerified: Date | null;
	iat: number;
	exp: number;
};

async function authenticate(request: FastifyRequest, reply: FastifyReply) {
	try {
		const token = request.headers.authorization?.split(" ")[1];
		console.log("token", token);

		if (!token) {
			return reply.status(401).send({
				error: "No access token provided",
			});
		}

		await request.jwtVerify();
	} catch (err) {
		return reply.status(401).send({
			error: "Invalid or expired access token",
		});
	}
}

export default fp(async (fastify) => {
	await fastify.register(jwt, {
		secret: env.JWT_SECRET,
		sign: { expiresIn: "10m" },
		cookie: {
			cookieName: "refresh-token",
			signed: true,
		},
	});

	fastify.decorate("authenticate", authenticate);
});

declare module "fastify" {
	export interface FastifyInstance {
		authenticate: typeof authenticate;
	}
}
