import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import fp from "fastify-plugin";
import { jsonSchemaTransform } from "fastify-type-provider-zod";
import pkg from "../../package.json";

export const DOCS_ROUTE_PREFIX = "/docs";

export default fp(async (fastify) => {
	await fastify.register(swagger, {
		hideUntagged: true,
		openapi: {
			openapi: "3.1.0",
			info: {
				title: "PCS Courier",
				description: "API Documentation",
				version: pkg.version,
			},
			servers: [
				{
					url: "/",
					description: "Version 1 (Latest)",
				},
			],
			security: [{ bearerAuth: [] }],
			components: {
				securitySchemes: {
					bearerAuth: {
						type: "http",
						scheme: "bearer",
						bearerFormat: "JWT",
						description:
							"JWT token for authentication. Example: Bearer <token>",
					},
				},
			},
		},
		transform: jsonSchemaTransform,
	});

	await fastify.register(swaggerUI, {
		routePrefix: DOCS_ROUTE_PREFIX,
		uiConfig: {
			defaultModelRendering: "model",
			defaultModelExpandDepth: 4,
			defaultModelsExpandDepth: 4,
			docExpansion: "list",
			persistAuthorization: true,
		},
		transformSpecification: (swaggerObject) => {
			// Optional: Transform the specification if needed
			return swaggerObject;
		},
		transformSpecificationClone: true,
	});
});
