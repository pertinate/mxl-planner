import { type z } from 'zod';
import { getSkillTree } from './characters';
import { type PlannerSchema } from './characterSchema';

const defaultPlanner: z.infer<typeof PlannerSchema> = {
    name: 'Default Planner',
    character: 'Paladin',
    characterData: {
        level: 1,
        baseStats: {
            strength: 25,
            dexterity: 20,
            vitality: 25,
            energy: 10,
        },
        stats: {
            strength: 0,
            dexterity: 0,
            vitality: 0,
            energy: 0,
        },
        skillQuests: {
            normal: {
                den: false,
                radamant: false,
                izual: false,
            },
            nightmare: {
                den: false,
                radamant: false,
                izual: false,
            },
            hell: {
                den: false,
                radamant: false,
                izual: false,
                signetOfSkill: false,
            },
        },
        totalSignets: 0,
        totalStatPoints: 0,
        totalSkillPoints: 0,
        skillTree: getSkillTree('Paladin'),
    },
};

export default defaultPlanner;
