import { env } from "@/env";
import { drizzle } from "drizzle-orm/postgres-js";
import { locations } from "./schema";
import { seed } from "drizzle-seed";
import * as schema from "./schema";


async function main() {
	const db = drizzle(env.DATABASE_URL, { schema });
	await seed(db, { locations });
}

main();
