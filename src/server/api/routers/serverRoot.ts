/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type { Impacts, ImpactsDetails } from "~/utils/type";

export const serveurRouter = createTRPCRouter({
  get: publicProcedure.mutation(async () => {
    const get = await fetch(
      "https://api.boavizta.org/v1/server/?archetype=compute_high&verbose=true&criteria=gwp&criteria=adpe&criteria=pe",
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      },
    );
    if (!get.ok) {
      throw new Error(`API request failed with status ${get.status}`);
    }
    const temp: { impacts: ImpactsDetails } = await get.json();
    const impactsTemps: ImpactsDetails = temp.impacts;
    const impactsSimp: Impacts = {
      adpe: impactsTemps.adpe.embedded.value + impactsTemps.adpe.use.value,
      gwp: impactsTemps.gwp.embedded.value + impactsTemps.gwp.use.value,
      pe: impactsTemps.pe.embedded.value + impactsTemps.pe.use.value,
    };
    return impactsSimp;
  }),

  getQuery: publicProcedure.query(async () => {
    const get = await fetch(
      "https://api.boavizta.org/v1/server/?archetype=compute_high&verbose=true&criteria=gwp&criteria=adpe&criteria=pe",
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      },
    );
    if (!get.ok) {
      throw new Error(`API request failed with status ${get.status}`);
    }
    const temp: { impacts: ImpactsDetails } = await get.json();
    const impactsTemps: ImpactsDetails = temp.impacts;
    const impactsSimp: Impacts = {
      adpe: impactsTemps.adpe.embedded.value + impactsTemps.adpe.use.value,
      gwp: impactsTemps.gwp.embedded.value + impactsTemps.gwp.use.value,
      pe: impactsTemps.pe.embedded.value + impactsTemps.pe.use.value,
    };
    return impactsSimp;
  }),
});
