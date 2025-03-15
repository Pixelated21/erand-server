import type { FastifyServerOptions } from "fastify";

export const envToConfig: Record<string, FastifyServerOptions> = {
	development: {
		logger: {
			level: "debug",
			transport: {
				target: "pino-pretty",
				options: {
					translateTime: "HH:MM:ss Z",
					ignore: "pid,hostname",
				},
			},
		},
		connectionTimeout: 60000, // 60 seconds
		keepAliveTimeout: 120000, // 2 minutes
		maxRequestsPerSocket: 0, // Unlimited
		requestTimeout: 60000, // 60 seconds
		bodyLimit: 10485760, // 10MB
		trustProxy: true,
		ignoreTrailingSlash: true,
		disableRequestLogging: false,
		caseSensitive: true,
		return503OnClosing: true,
	},
	production: {
		logger: {
			level: "info",
			transport: {
				target: "pino-pretty",
				options: {
					translateTime: "HH:MM:ss Z",
					ignore: "pid,hostname",
				},
			},
			redact: [
				"req.headers.authorization",
				"req.headers.cookie",
				"body.password",
			],
		},
		connectionTimeout: 30000, // 30 seconds
		keepAliveTimeout: 75000, // 75 seconds
		maxRequestsPerSocket: 1000,
		requestTimeout: 30000, // 30 seconds
		bodyLimit: 5242880, // 5MB
		trustProxy: true,
		ignoreTrailingSlash: true,
		caseSensitive: true,
		return503OnClosing: true,
	},
};
