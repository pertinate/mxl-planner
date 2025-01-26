import { z } from 'zod';

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from '~/server/api/trpc';
import { planners } from '~/server/db/schema';

const quests = z.object({
    den: z.boolean(),
    radamant: z.boolean(),
    izual: z.boolean(),
});

const SkillSchema = z.object({
    name: z.string(),
    maxLevel: z.number(),
    currentLevel: z.number(),
    isPassive: z.boolean(),
    previous: z.number(),
    next: z.number(),
});

const SkillTreeSchema = z.object({
    name: z.string(),
    skills: z.array(SkillSchema),
});

const StatsSchema = z.object({
    strength: z.number(),
    dexterity: z.number(),
    vitality: z.number(),
    energy: z.number(),
});

const CharacterDataSchema = z.object({
    level: z.number(),
    baseStats: StatsSchema,
    stats: StatsSchema,
    skillQuests: z.object({
        normal: quests,
        nightmare: quests,
        hell: z.union([quests, z.object({ signetOfSkill: z.boolean() })]),
    }),
    totalSignets: z.number(),
    totalStatPoints: z.number(),
    totalSkillPoints: z.number(),
    skillTree: z.array(SkillTreeSchema),
});

const CharacterSchema = z.union([z.literal('Paladin'), z.literal('Sorceress')]);

const PlannerSchema = z.object({
    name: z.string().max(15),
    character: CharacterSchema,
    characterData: CharacterDataSchema,
});

export const plannersRouter = createTRPCRouter({
    create: protectedProcedure
        .input(z.object({ name: z.string().min(1) }))
        .mutation(async ({ ctx, input }) => {
            await ctx.db.insert(planners).values({
                name: input.name,
                createdById: ctx.session.user.id,
            });
        }),
    get: publicProcedure
        .input(z.array(z.string()))
        .query(async ({ ctx, input }) => {
            return await ctx.db.query.planners.findMany({
                where: (planner, { inArray }) =>
                    inArray(planner.id, input.map(Number)),
            });
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
