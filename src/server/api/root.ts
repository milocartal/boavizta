import { createTRPCRouter } from "~/server/api/trpc";
import { deviceRouter } from "./routers/devices";
import { archetypeRouter } from "./routers/archetypes";
import { countryRouter } from "./routers/country";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  device: deviceRouter,
  archetypes: archetypeRouter,
  countries: countryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
