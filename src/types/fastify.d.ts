import type { Database } from "@/plugins/database";
import type { JwtPayload, JwtUser } from "@/plugins/jwt";
import type { FastifySocketIoOptions } from "@/plugins/socket-io";
import type { JWT } from "@fastify/jwt";
import type { Server } from "socket.io";

declare module "fastify" {
	interface FastifyInstance {
		db: Database;
		jwt: JWT;
		io: Server;
	}
}

declare module "@fastify/jwt" {
	interface FastifyJWT {
		payload: JwtPayload;
		user: JwtUser;
	}
}
