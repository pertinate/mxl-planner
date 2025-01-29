import { z } from 'zod';

export const quests = z.object({
    den: z.boolean(),
    radamant: z.boolean(),
    izual: z.boolean(),
});

export const SkillSchema = z.object({
    name: z.string(),
    maxLevel: z.number(),
    currentLevel: z.number(),
    isPassive: z.boolean(),
    previous: z.number(),
    next: z.number(),
});

export const SkillTreeSchema = z.object({
    name: z.string(),
    skills: z.array(SkillSchema),
});

export const StatsSchema = z.object({
    strength: z.number(),
    dexterity: z.number(),
    vitality: z.number(),
    energy: z.number(),
});

export const CharacterDataSchema = z.object({
    level: z.number(),
    baseStats: StatsSchema,
    stats: StatsSchema,
    skillQuests: z.object({
        normal: quests,
        nightmare: quests,
        hell: z.union([quests, z.object({ signetOfSkill: z.boolean() })]),
    }),
    statQuests: z
        .object({
            normal: z.boolean(),
            nightmare: z.boolean(),
            hell: z.boolean(),
        })
        .default({ normal: false, nightmare: false, hell: false }),
    totalSignets: z.number(),
    totalStatPoints: z.number(),
    totalSkillPoints: z.number(),
    skillTree: z.array(SkillTreeSchema),
});

export const CharacterSchema = z.union([
    z.literal('Paladin'),
    z.literal('Sorceress'),
]);

export const PlannerSchema = z.object({
    name: z.string().max(15),
    character: CharacterSchema,
    characterData: CharacterDataSchema,
});
