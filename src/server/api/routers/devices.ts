/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type { Impacts, ImpactsDetails } from "~/utils/type";

export const deviceRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ type: z.string(), model: z.string() }))
    .query(async ({ input }) => {
      let tempType = input.type;
      if (tempType === "server") {
        tempType += "/";
      }
      const get = await fetch(
        `https://api.boavizta.org/v1/${tempType}?archetype=${input.model}&verbose=true&criteria=gwp&criteria=adpe&criteria=pe`,
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

  get_mut: publicProcedure
    .input(z.object({ type: z.string(), model: z.string() }))
    .mutation(async ({ input }) => {
      let tempType = input.type;
      if (tempType === "server") {
        tempType += "/";
      }
      const get = await fetch(
        `https://api.boavizta.org/v1/${tempType}?archetype=${input.model}&verbose=true&criteria=gwp&criteria=adpe&criteria=pe`,
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
        adpe:
          Number(impactsTemps.adpe.embedded.value) ||
          0 + impactsTemps.adpe.use.value,
        gwp:
          Number(impactsTemps.gwp.embedded.value) ||
          0 + impactsTemps.gwp.use.value,
        pe:
          Number(impactsTemps.pe.embedded.value) ||
          0 + impactsTemps.pe.use.value,
      };
      return impactsSimp;
    }),

  post: publicProcedure
    .input(
      z.object({
        type: z.string(),
        model: z.string(),
        location: z.string(),
        avg_power: z.number(),
        years_lifespan: z.number(),
        use_time: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      let tempType = input.type;
      if (tempType === "server") {
        tempType += "/";
      }
      const body = {
        usage: {
          use_time_ratio: input.use_time / 24,
          usage_location: input.location,
          avg_power: input.avg_power,
          hours_life_time: input.years_lifespan * 8760,
        },
      }
      console.log('body',body)
      console.log('url',`https://api.boavizta.org/v1/${tempType}?verbose=true&archetype=${input.model}&criteria=gwp&criteria=adpe&criteria=pe`)
      const post = await fetch(
        `https://api.boavizta.org/v1/${tempType}?verbose=true&archetype=${input.model}&criteria=gwp&criteria=adpe&criteria=pe`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            usage: {
              use_time_ratio: input.use_time / 24,
              usage_location: input.location,
              avg_power: input.avg_power,
              hours_life_time: input.years_lifespan * 8760,
            },
          }),
        },
      );
      if (!post.ok) {
        throw new Error(`API request failed with status ${post.status}`);
      }
      const temp: { impacts: ImpactsDetails } = await post.json();
      const impactsTemps: ImpactsDetails = temp.impacts;
      const impactsSimp: Impacts = {
        adpe:
          Number(impactsTemps.adpe.embedded.value) ||
          0 + impactsTemps.adpe.use.value,
        gwp:
          Number(impactsTemps.gwp.embedded.value) ||
          0 + impactsTemps.gwp.use.value,
        pe:
          Number(impactsTemps.pe.embedded.value) ||
          0 + impactsTemps.pe.use.value,
      };
      return impactsSimp;
    }),
});
