import { appInfo } from "@/config/app-info";
import { Role } from "@/config/role";
import { env } from "@/env";
import { resend } from "@/lib/resend";
import type { JwtPayload, JwtUser } from "@/plugins/jwt";
import type { RequestContext } from "@/types/service";
import { randomUUIDv7 } from "bun";
import { eq } from "drizzle-orm";
import type { FastifyInstance } from "fastify";
import type { LoginInput, RegisterInput } from "./schema";
import { createToken, formatUserForJWT } from "./utils";
import { auth } from "@/database/schema";

export const login = async ({
	app,
	data,
}: RequestContext<never, LoginInput>) => {
	if (!data) throw app.httpErrors.badRequest("Invalid credentials");

	const existingUser = await app.db.query.auth.findFirst({
		where: (auth, { eq }) => eq(auth.email, data.email),
	});

	if (!existingUser) {
		throw app.httpErrors.unauthorized("Invalid credentials");
	}

	const isValidPassword = await Bun.password.verify(
		data.password,
		existingUser.passwordHash,
	);

	if (!isValidPassword)
		throw app.httpErrors.unauthorized("Invalid credentials");

	const payload = formatUserForJWT(existingUser);

	const { accessToken, refreshToken, expires } = await createToken({
		jwt: app.jwt,
		payload,
	});

	const userWithoutPassword = { ...existingUser, passwordHash: undefined };

	return {
		user: userWithoutPassword,
		tokens: { accessToken, refreshToken, expires },
	};
};

export const register = async ({
	app,
	data,
}: RequestContext<never, RegisterInput>) => {
	if (!data) throw app.httpErrors.unprocessableEntity();

	const isUserTaken = await app.db.transaction(async (tx) => {
		let referralId: string | undefined;

		const existingUserWithEmail = await tx.query.auth.findFirst({
			where: (auth, { eq }) => eq(auth.email, data.email),
		});

		// if (data.referralCode) {
		// 	const referral = await tx.query.users.findFirst({
		// 		where: eq(users.referralCode, data.referralCode),
		// 		columns: {
		// 			id: true,
		// 		},
		// 	});

		// 	if (referral) {
		// 		referralId = referral.id;
		// 	}
		// }

		const existingUser = existingUserWithEmail;

		return {
			existingUser,
			referralId,
		};
	});

	if (isUserTaken.existingUser) {
		throw app.httpErrors.conflict("User already exists");
	}

	const passwordHash = await Bun.password.hash(data.password);

	const [user] = await app.db
		.insert(auth)
		.values({
			email: data.email,
			passwordHash: passwordHash,
			roles: data.roles,
			emailVerified: data.emailVerified,
			phoneNumberVerified: data.phoneNumberVerified,
		})
		.returning();

	if (!user) {
		throw app.httpErrors.internalServerError("Failed to create user");
	}

	const payload: JwtPayload = formatUserForJWT({
		...user,
	});

	const { accessToken, refreshToken } = await createToken({
		jwt: app.jwt,
		payload,
	});

	return { tokens: { accessToken, refreshToken } };
};

export const refresh = async ({
	app,
	user,
}: { app: FastifyInstance; user: JwtUser }) => {
	try {
		if (!user) {
			throw app.httpErrors.unauthorized("Invalid refresh token");
		}

		const { exp, iat, ...payload } = user;

		const { accessToken, refreshToken } = await createToken({
			jwt: app.jwt,
			payload,
		});

		return { tokens: { accessToken, refreshToken } };
	} catch (error) {
		throw app.httpErrors.unauthorized("Invalid refresh token");
	}
};
