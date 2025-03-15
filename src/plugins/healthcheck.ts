import healthcheck, {
	type CustomHealthCheckOptions,
} from "fastify-custom-healthcheck";
import fp from "fastify-plugin";

export default fp<CustomHealthCheckOptions>(async (fastify, opts) => {
	await fastify.register(healthcheck, {
		path: "/healthcheck",
		exposeFailure: true,
		schema: {
			tags: ["Healthcheck"],
		},
		...opts,
	});

	fastify.addHealthCheck("database", async () => {
		const response = await fastify.db.query.parcels.findFirst();
		console.log(response);
		return response ? "OK" : "NOT OK";
	});
});
