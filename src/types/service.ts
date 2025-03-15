import type { JwtUser } from "@/plugins/jwt";
import type { FastifyInstance } from "fastify";

export interface RequestContext<
	TParams = Record<string, unknown>,
	TData = undefined,
	TSearchParams = Record<string, unknown>,
> {
	app: FastifyInstance;
	user?: JwtUser;
	data?: TData;
	params?: TParams;
	searchParams?: TSearchParams;
	requestInfo?: RequestInfo;
}

export interface AuthenticatedRequestContext<
	TParams = Record<string, unknown>,
	TData = undefined,
	TSearchParams = Record<string, unknown>,
> extends RequestContext<TParams, TData, TSearchParams> {
	user: JwtUser;
}
