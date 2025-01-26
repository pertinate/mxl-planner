// src/stores/counter-store.ts
import { createStore } from 'zustand/vanilla';
import test from '~/components/test';
import * as O from 'optics-ts';

export const characters = ['Paladin'] as const;

export type BuilderState = {
    buildName: string;
    character: (typeof characters)[number];
    charData: CharData;
};

type SkillQuest = {
    den: boolean;
    radamant: boolean;
    izual: boolean;
};

type CharData = {
    level: number;
    stats: {
        strength: number;
        dexterity: number;
        vitality: number;
        energy: number;
    };
    skillQuests: {
        normal: SkillQuest;
        nightmare: SkillQuest;
        hell: SkillQuest & {
            signetOfSkill: boolean;
        };
    };
    totalSignets: number;
    totalStatPoints: number;
    usedStatPoints: number;
    totalSkillPoints: number;
    usedSkillPoints: number;
    skillTree: SkillTree[];
};

type SkillTree = {
    name: string;
    skills: Skill[];
};

export type Skill = {
    name: string;
    maxLevel: number;
    currentLevel: number;
    isPassive: boolean;
    previous: number;
    next: number;
};

//for url compression
export type CharacterDataArray = [
    number, // level
    [number, number, number, number], // stats
    [
        [number, number, number], // normal
        [number, number, number], // nightmare
        [number, number, number, number], // hell
    ],
    number, // totalSignets
    number, // totalStatPoints
    number, // usedStatPoints
    number, // totalSkillPoints
    number, // usedSkillPoints
    [
        // skillTree
        [string, [string, number, number, number, number, number][]][], // [[treeName, [[skillName, maxLevel, currentLevel, previous, next]]]]
    ],
];

export type UncompressedData = BuilderState & { charData: CharacterDataArray };

export type BuilderActions = {
    decrementCount: () => void;
    incrementCount: () => void;
    incrementLevel: (tree: number, skill: number) => void;
    decrementLevel: (tree: number, skill: number) => void;
};

export type BuilderStore = BuilderState & BuilderActions;

export const initBuilderStore = (state?: BuilderState): BuilderState => {
    return {
        buildName: 'custom-build',
        character: 'Paladin',
        charData: getDefaultChar('Paladin'),
        ...state,
    };
};

export const positionData: Record<
    string,
    { rowStart: number; colStart: number }
> = {
    'Elemental Wisdom': {
        rowStart: 1,
        colStart: 2,
    },
    'Veneration of Justice': {
        rowStart: 2,
        colStart: 2,
    },
    'Spark of Hope': {
        rowStart: 3,
        colStart: 2,
    },
    'Ward of Fate': {
        rowStart: 4,
        colStart: 2,
    },
    Valiance: {
        rowStart: 4,
        colStart: 3,
    },
    'Servants of Valor': {
        rowStart: 5,
        colStart: 2,
    },
    Conclave: {
        rowStart: 6,
        colStart: 1,
    },
    Fervor: {
        rowStart: 6,
        colStart: 3,
    },
    Retaliate: {
        rowStart: 1,
        colStart: 1,
    },
    Counterattack: {
        rowStart: 1,
        colStart: 2,
    },
    'Divine Judgement': {
        rowStart: 2,
        colStart: 2,
    },
    Consecration: {
        rowStart: 2,
        colStart: 3,
    },
    Lionheart: {
        rowStart: 4,
        colStart: 1,
    },
    'Holy Fire': {
        rowStart: 5,
        colStart: 2,
    },
    Colosseum: {
        rowStart: 6,
        colStart: 1,
    },
    'Dragon Jaws': {
        rowStart: 1,
        colStart: 1,
    },
    'Solar Flare': {
        rowStart: 2,
        colStart: 3,
    },
    'Dragonbone Armor': {
        rowStart: 3,
        colStart: 2,
    },
    Scion: {
        rowStart: 3,
        colStart: 3,
    },
    'Apex Predator': {
        rowStart: 4,
        colStart: 1,
    },
    Annihilation: {
        rowStart: 5,
        colStart: 2,
    },
    'Dragons Breath': {
        rowStart: 5,
        colStart: 3,
    },
    Combustion: {
        rowStart: 6,
        colStart: 3,
    },
    'Vessel of Retribution': {
        rowStart: 1,
        colStart: 1,
    },
    'Vessel of Judgement': {
        rowStart: 1,
        colStart: 3,
    },
    'Solstice and Equinox': {
        rowStart: 2,
        colStart: 1,
    },
};

const characterData: Record<(typeof characters)[number], CharData> = {
    Paladin: {
        level: 1,
        stats: {
            strength: 25,
            dexterity: 20,
            vitality: 25,
            energy: 15,
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
        usedStatPoints: 0,
        totalSkillPoints: 0,
        usedSkillPoints: 0,
        skillTree: [
            {
                name: 'Aspects',
                skills: [
                    {
                        name: 'Elemental Wisdom',
                        maxLevel: 25,
                        currentLevel: 0,
                        isPassive: false,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Veneration of Justice',
                        maxLevel: 25,
                        currentLevel: 0,
                        isPassive: false,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Spark of Hope',
                        maxLevel: 25,
                        currentLevel: 0,
                        isPassive: false,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Ward of Fate',
                        maxLevel: 25,
                        currentLevel: 0,
                        isPassive: false,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Valiance',
                        maxLevel: 10,
                        currentLevel: 0,
                        isPassive: true,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Servants of Valor',
                        maxLevel: 25,
                        currentLevel: 0,
                        isPassive: false,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Conclave',
                        maxLevel: 10,
                        currentLevel: 0,
                        isPassive: true,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Fervor',
                        maxLevel: 20,
                        currentLevel: 0,
                        isPassive: true,
                        previous: -1,
                        next: 1,
                    },
                ],
            },
            {
                name: 'Templar',
                skills: [
                    {
                        name: 'Retaliate',
                        maxLevel: 25,
                        currentLevel: 0,
                        isPassive: false,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Counterattack',
                        maxLevel: 4,
                        currentLevel: 0,
                        isPassive: true,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Divine Judgement',
                        maxLevel: 25,
                        currentLevel: 0,
                        isPassive: false,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Consecration',
                        maxLevel: 5,
                        currentLevel: 0,
                        isPassive: true,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Lionheart',
                        maxLevel: 25,
                        currentLevel: 0,
                        isPassive: false,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Holy Fire',
                        maxLevel: 25,
                        currentLevel: 0,
                        isPassive: true,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Colosseum',
                        maxLevel: 20,
                        currentLevel: 0,
                        isPassive: false,
                        previous: -1,
                        next: 1,
                    },
                ],
            },
            {
                name: 'Incarnation',
                skills: [
                    {
                        name: 'Dragon Jaws',
                        maxLevel: 25,
                        currentLevel: 0,
                        isPassive: false,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Solar Flare',
                        maxLevel: 20,
                        currentLevel: 0,
                        isPassive: false,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Scion',
                        maxLevel: 4,
                        currentLevel: 0,
                        isPassive: true,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Dragonbone Armor',
                        maxLevel: 25,
                        currentLevel: 0,
                        isPassive: false,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Apex Predator',
                        maxLevel: 4,
                        currentLevel: 0,
                        isPassive: true,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Annihilation',
                        maxLevel: 25,
                        currentLevel: 0,
                        isPassive: false,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Dragons Breath',
                        maxLevel: 8,
                        currentLevel: 0,
                        isPassive: false,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Combustion',
                        maxLevel: 5,
                        currentLevel: 0,
                        isPassive: true,
                        previous: -1,
                        next: 1,
                    },
                ],
            },
            {
                name: 'Nephalem',
                skills: [
                    {
                        name: 'Vessel of Retribution',
                        maxLevel: 25,
                        currentLevel: 0,
                        isPassive: false,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Vessel of Judgement',
                        maxLevel: 25,
                        currentLevel: 0,
                        isPassive: false,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Solstice and Equinox',
                        maxLevel: 25,
                        currentLevel: 0,
                        isPassive: true,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Life and Death',
                        maxLevel: 25,
                        currentLevel: 0,
                        isPassive: true,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Absolution',
                        maxLevel: 1,
                        currentLevel: 0,
                        isPassive: false,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Reverence',
                        maxLevel: 1,
                        currentLevel: 0,
                        isPassive: false,
                        previous: -1,
                        next: 1,
                    },
                ],
            },
            {
                name: 'Ritualist',
                skills: [
                    {
                        name: 'Grim Presence',
                        maxLevel: 25,
                        currentLevel: 0,
                        isPassive: false,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Lemures',
                        maxLevel: 25,
                        currentLevel: 0,
                        isPassive: false,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Rite of the Restless',
                        maxLevel: 1,
                        currentLevel: 0,
                        isPassive: false,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Blood Thorns',
                        maxLevel: 25,
                        currentLevel: 0,
                        isPassive: false,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Rite of Thorns',
                        maxLevel: 1,
                        currentLevel: 0,
                        isPassive: false,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Possession',
                        maxLevel: 10,
                        currentLevel: 0,
                        isPassive: false,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Sanguine Covenant',
                        maxLevel: 15,
                        currentLevel: 0,
                        isPassive: false,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Frostbite',
                        maxLevel: 20,
                        currentLevel: 0,
                        isPassive: true,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Transcendence',
                        maxLevel: 5,
                        currentLevel: 0,
                        isPassive: true,
                        previous: -1,
                        next: 1,
                    },
                ],
            },
            {
                name: 'Warlock',
                skills: [
                    {
                        name: 'Mind Flay',
                        maxLevel: 25,
                        currentLevel: 0,
                        isPassive: false,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Confluence',
                        maxLevel: 1,
                        currentLevel: 0,
                        isPassive: true,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Stormlord',
                        maxLevel: 25,
                        currentLevel: 0,
                        isPassive: true,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Tainted Blood',
                        maxLevel: 15,
                        currentLevel: 0,
                        isPassive: false,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Acumen',
                        maxLevel: 1,
                        currentLevel: 0,
                        isPassive: true,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Slayer',
                        maxLevel: 25,
                        currentLevel: 0,
                        isPassive: false,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Symphony of Destruction',
                        maxLevel: 1,
                        currentLevel: 0,
                        isPassive: true,
                        previous: -1,
                        next: 1,
                    },
                ],
            },
            {
                name: 'Mastery',
                skills: [
                    {
                        name: 'Meditation',
                        maxLevel: 3,
                        currentLevel: 0,
                        isPassive: true,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Purity',
                        maxLevel: 4,
                        currentLevel: 0,
                        isPassive: true,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Melee Devotion',
                        maxLevel: 1,
                        currentLevel: 0,
                        isPassive: true,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Freedom',
                        maxLevel: 5,
                        currentLevel: 0,
                        isPassive: true,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Tenacity',
                        maxLevel: 5,
                        currentLevel: 0,
                        isPassive: true,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Endurance',
                        maxLevel: 10,
                        currentLevel: 0,
                        isPassive: true,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Continuity',
                        maxLevel: 6,
                        currentLevel: 0,
                        isPassive: true,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Specialization',
                        maxLevel: 10,
                        currentLevel: 0,
                        isPassive: true,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Chemistry',
                        maxLevel: 5,
                        currentLevel: 0,
                        isPassive: true,
                        previous: -1,
                        next: 1,
                    },
                ],
            },
            {
                name: 'Reward',
                skills: [
                    {
                        name: 'Divine Apparition',
                        maxLevel: 15,
                        currentLevel: 0,
                        isPassive: false,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Blessed Life',
                        maxLevel: 15,
                        currentLevel: 0,
                        isPassive: true,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Dragons Blessing',
                        maxLevel: 15,
                        currentLevel: 0,
                        isPassive: true,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Resurrect',
                        maxLevel: 15,
                        currentLevel: 0,
                        isPassive: false,
                        previous: -1,
                        next: 1,
                    },
                    {
                        name: 'Superbeast',
                        maxLevel: 15,
                        currentLevel: 0,
                        isPassive: false,
                        previous: -1,
                        next: 1,
                    },
                ],
            },
        ],
    },
};

// {
//     name: '',
//     maxLevel: 25,
//     currentLevel: 0,
//     isPassive: false,
//     previous: -1,
//     next: 1,
// },

const getDefaultChar = (character: (typeof characters)[number]): CharData =>
    characterData[character];

export const defaultInitState: BuilderState = {
    buildName: 'custom-build',
    character: 'Paladin',
    charData: getDefaultChar('Paladin'),
};

export const createCounterStore = (
    initState: BuilderState = defaultInitState
) => {
    return createStore<BuilderStore>()(set => ({
        ...initState,
        decrementCount: () => {
            const lens = O.optic<BuilderState>()
                .prop('charData')
                .prop('skillTree')
                .at(0)
                .path('skills')
                .at(7)
                .path('currentLevel');

            return set(O.modify(lens)((level: number) => level - 1));
        },
        incrementCount: () => set(state => ({})),
        incrementLevel(tree, skill) {
            const lens = O.optic<BuilderState>()
                .prop('charData')
                .prop('skillTree')
                .at(tree)
                .path('skills')
                .at(skill);

            return set(state =>
                O.modify(lens.path('currentLevel'))((level: number) =>
                    Math.min(
                        level + 1,
                        state.charData.skillTree[tree]?.skills[skill]
                            ?.maxLevel ?? 0
                    )
                )(state)
            );
        },
        decrementLevel(tree, skill) {
            const lens = O.optic<BuilderState>()
                .prop('charData')
                .prop('skillTree')
                .at(tree)
                .path('skills')
                .at(skill)
                .path('currentLevel');

            return set(
                O.modify(lens)((level: number) => Math.max(level - 1, 0))
            );
        },
    }));
};

export function compressCharacterData(data: CharData): CharacterDataArray {
    return [
        data.level,
        [
            data.stats.strength,
            data.stats.dexterity,
            data.stats.vitality,
            data.stats.energy,
        ],
        [
            [
                +data.skillQuests.normal.den,
                +data.skillQuests.normal.radamant,
                +data.skillQuests.normal.izual,
            ],
            [
                +data.skillQuests.nightmare.den,
                +data.skillQuests.nightmare.radamant,
                +data.skillQuests.nightmare.izual,
            ],
            [
                +data.skillQuests.hell.den,
                +data.skillQuests.hell.radamant,
                +data.skillQuests.hell.izual,
                +data.skillQuests.hell.signetOfSkill,
            ],
        ],
        data.totalSignets,
        data.totalStatPoints,
        data.usedStatPoints,
        data.totalSkillPoints,
        data.usedSkillPoints,
        //@ts-expect-error "Test"
        data.skillTree.map(tree => [
            tree.name,
            tree.skills.map(skill => [
                skill.name,
                skill.maxLevel,
                skill.currentLevel,
                +skill.isPassive,
                skill.previous,
                skill.next,
            ]),
        ]),
    ];
}

export function decompressCharacterData(data: CharacterDataArray): CharData {
    return {
        level: data[0],
        stats: {
            strength: data[1][0],
            dexterity: data[1][1],
            vitality: data[1][2],
            energy: data[1][3],
        },
        skillQuests: {
            normal: {
                den: !!data[2][0][0],
                radamant: !!data[2][0][1],
                izual: !!data[2][0][2],
            },
            nightmare: {
                den: !!data[2][1][0],
                radamant: !!data[2][1][1],
                izual: !!data[2][1][2],
            },
            hell: {
                den: !!data[2][2][0],
                radamant: !!data[2][2][1],
                izual: !!data[2][2][2],
                signetOfSkill: !!data[2][2][3],
            },
        },
        totalSignets: data[3],
        totalStatPoints: data[4],
        usedStatPoints: data[5],
        totalSkillPoints: data[6],
        usedSkillPoints: data[7],
        //@ts-expect-error "Test"
        skillTree: data[8].map(tree => ({
            name: tree[0],
            skills: tree[1]?.map(skill => ({
                name: skill[0],
                maxLevel: skill[1],
                currentLevel: skill[2],
                isPassive: !!skill[3],
                previous: skill[4],
                next: skill[5],
            })),
        })),
    };
}
