/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const archetypeRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ type: z.string() }))
    .query(async ({ input }) => {
      const temp = await fetch(
        `https://api.boavizta.org/v1/${input.type}/archetypes`,
        {
          method: "GET",
          headers: { accept: "application/json" },
        },
      );
      if (!temp.ok) {
        throw new Error(`API request failed with status ${temp.status}`);
      }
      const archetypes: Array<string> = await temp.json();
      return archetypes;
    }),
    
  get_mut: publicProcedure
    .input(z.object({ type: z.string() }))
    .mutation(async ({ input }) => {
      const temp = await fetch(
        `https://api.boavizta.org/v1/${input.type}/archetypes`,
        {
          method: "GET",
          headers: { accept: "application/json" },
        },
      );
      if (!temp.ok) {
        throw new Error(`API request failed with status ${temp.status}`);
      }
      const archetypes: Array<string> = await temp.json();
      return archetypes;
    }),
});
