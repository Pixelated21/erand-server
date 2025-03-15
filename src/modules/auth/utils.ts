import type { FastifyInstance } from "fastify";
import type { JwtPayload } from "@/plugins/jwt";
import type { Auth } from "@/database/schema/auth";

export async function createToken({
	jwt,
	payload,
}: {
	jwt: FastifyInstance["jwt"];
	payload: JwtPayload;
}): Promise<{ accessToken: string; refreshToken: string; expires: Date }> {
	const accessToken = jwt.sign(payload, {
		expiresIn: "1m",
	});
	const refreshToken = jwt.sign(payload, {
		expiresIn: "30d",
	});

	const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

	return {
		accessToken,
		refreshToken,
		expires,
	};
}

export function formatUserForJWT(user: Auth): JwtPayload {
	return {
		id: user.id,
		email: user.email,
		roles: user.roles,
		emailVerified: user.emailVerified,
		phoneNumberVerified: user.phoneNumberVerified,
	};
}
