/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const countryRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const temp = await fetch(`https://api.boavizta.org/v1/utils/country_code`, {
      method: "GET",
      headers: { accept: "application/json" },
    });
    if (!temp.ok) {
      throw new Error(`API request failed with status ${temp.status}`);
    }
    const data = await temp.json()
    return data;
  }),

  get_mut: publicProcedure.mutation(async () => {
    const temp = await fetch(`https://api.boavizta.org/v1/utils/country_code`, {
      method: "GET",
      headers: { accept: "application/json" },
    });
    if (!temp.ok) {
      throw new Error(`API request failed with status ${temp.status}`);
    }
    const data = await temp.json()
    return data;
  }),
});
