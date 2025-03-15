import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";
import { env } from "./src/env";

const environment = process.env.NODE_ENV || "development";
config({ path: `.env.${environment}` });

export default defineConfig({
	dialect: "postgresql",
	schema: "./src/database/schema/index.ts",
	out: "./src/database/migrations",
	dbCredentials: {
		url: env.DATABASE_URL,
	},
	casing: "snake_case",
	verbose: true,
});
