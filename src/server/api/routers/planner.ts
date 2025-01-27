import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import {
    CharacterDataSchema,
    type CharacterSchema,
    PlannerSchema,
} from '~/planner/characterSchema';
import defaultPlanner from '~/planner/defaultPlanner';

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from '~/server/api/trpc';
import { planners } from '~/server/db/schema';

export const plannersRouter = createTRPCRouter({
    create: protectedProcedure
        .input(PlannerSchema.default(defaultPlanner))
        .mutation(async ({ ctx, input }) => {
            return;
            const execute = await ctx.db.insert(planners).values({
                name: input.name,
                character: input.character,
                data: JSON.stringify(input.characterData),
                createdById: ctx.session.user.id,
            });

            return execute.insertId;
        }),
    get: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
        const data = await ctx.db.query.planners.findFirst({
            where: (planner, { eq }) => eq(planner.id, Number(input)),
        });
        if (!data) {
            throw new TRPCError({ code: 'NOT_FOUND' });
        }

        return {
            name: data.name!,
            character: data.character! as z.infer<typeof CharacterSchema>,
            characterData: CharacterDataSchema.parse(
                JSON.parse(data.data as string)
            ),
        } satisfies z.infer<typeof PlannerSchema>;
    }),
    getMany: publicProcedure
        .input(z.number().default(-1))
        .query(async ({ ctx, input }) => {
            return await ctx.db.query.planners.findMany({
                where: (planner, { gt }) => gt(planner.id, input),
                limit: 10,
            });
        }),

    //   getLatest: protectedProcedure.query(async ({ ctx }) => {
    //     const post = await ctx.db.query.posts.findFirst({
    //       orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    //     });

    //     return post ?? null;
    //   }),

    //   getSecretMessage: protectedProcedure.query(() => {
    //     return "you can now see this secret message!";
    //   }),
});
