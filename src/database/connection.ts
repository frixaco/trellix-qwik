// import { PrismaClient } from "@prisma/client";
//
// export const db = new PrismaClient();

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const queryClient = postgres(process.env.DATABASE_URL!);
export const db = drizzle(queryClient);
