import { z } from "zod";

interface RouteSchemaProps {
	tags?: string[];
	params?: z.ZodObject<z.ZodRawShape>;
	body?: z.ZodObject<z.ZodRawShape>;
	querystring?: z.ZodObject<z.ZodRawShape>;
	response?: z.ZodObject<z.ZodRawShape>;

}

export const createBaseRouteSchema = (props: RouteSchemaProps = {}) => {
	const schema: RouteSchemaProps = {
		tags: props.tags || [],
	};

	if (props.params) schema.params = props.params;
	if (props.body) schema.body = props.body;
	if (props.querystring) schema.querystring = props.querystring;
	if (props.response) schema.response = props.response;

	return schema;
};

export const paginationParamsSchema = z.object({
	page: z.coerce
		.number()
		.min(1, "Page number must be greater than or equal to 1")
		.default(1),
	limit: z.coerce
		.number()
		.min(1, "Limit must be greater than or equal to 1")
		.max(100, "Limit must be less than or equal to 100")
		.default(10),
	sort: z.string().optional(),
});

export type PaginationQuery = z.infer<typeof paginationParamsSchema>;
