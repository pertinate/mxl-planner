// src/stores/counter-store.ts
import { createStore } from 'zustand/vanilla';
import * as O from 'optics-ts';
import defaultPlanner from '~/planner/defaultPlanner';
import {
    type CharacterSchema,
    type PlannerSchema,
    type StatsSchema,
} from '~/planner/characterSchema';
import { type z } from 'zod';

export type BuilderState = z.infer<typeof PlannerSchema>;

export type BuilderActions = {
    incrementSkillLevel: (tree: number, skill: number) => void;
    decrementSkillLevel: (tree: number, skill: number) => void;
    incrementCharacterLevel: () => void;
    decrementCharacterLevel: () => void;
    setCharacterLevel: (level: number) => void;
    changeCharacter: (character: z.infer<typeof CharacterSchema>) => void;
    reduceCharacterStat: (
        stat: keyof z.infer<typeof StatsSchema>,
        value: number
    ) => void;
    increaseCharacterStat: (
        stat: keyof z.infer<typeof StatsSchema>,
        value: number
    ) => void;
    increaseSignetCount: (value: number) => void;
    decreaseSignetCount: (value: number) => void;
};

export type BuilderStore = BuilderState & BuilderActions;

export const initBuilderStore = (state?: BuilderState): BuilderState => {
    return {
        ...defaultPlanner,
        ...state,
    };
};

export const defaultInitState: BuilderState = defaultPlanner;

export const createCounterStore = (
    initState: BuilderState = defaultInitState
) => {
    return createStore<BuilderStore>()(set => ({
        ...initState,
        incrementSkillLevel(tree, skill) {
            const lens = O.optic<BuilderState>()
                .prop('characterData')
                .prop('skillTree')
                .at(tree)
                .prop('skills')
                .at(skill);

            return set(state =>
                //@ts-expect-error "TS expects it to be infinite but it is not"
                O.modify(lens.prop('currentLevel'))((level: number) =>
                    Math.min(
                        level + 1,
                        state.characterData.skillTree[tree]?.skills[skill]
                            ?.maxLevel ?? 0
                    )
                )(state)
            );
        },
        decrementSkillLevel(tree, skill) {
            const lens = O.optic<BuilderState>()
                .prop('characterData')
                .prop('skillTree')
                .at(tree)
                .path('skills')
                .at(skill)
                .path('currentLevel');

            return set(
                O.modify(lens)((level: number) => Math.max(level - 1, 0))
            );
        },
        incrementCharacterLevel() {
            const lens = O.optic<BuilderState>()
                .prop('characterData')
                .prop('level');
            return set(O.modify(lens)(level => Math.min(150, level + 1)));
        },
        decrementCharacterLevel() {
            const lens = O.optic<BuilderState>()
                .prop('characterData')
                .prop('level');
            return set(O.modify(lens)(level => Math.max(0, level - 1)));
        },
        changeCharacter(character) {
            //change character
            //update characterData with default characterData for new character
            return set(() => ({ character }));
        },
        reduceCharacterStat(stat, value) {
            const lens = O.optic<BuilderState>()
                .prop('characterData')
                .prop('stats')
                .prop(stat);
            return set(state =>
                O.modify(lens)(statState => Math.max(statState - value, 0))(
                    state
                )
            );
        },
        increaseCharacterStat(stat, value) {
            const lens = O.optic<BuilderState>()
                .prop('characterData')
                .prop('stats')
                .prop(stat);
            return set(state =>
                O.modify(lens)(statState => statState + value)(state)
            );
        },
        increaseSignetCount(value) {
            const lens = O.optic<BuilderState>()
                .prop('characterData')
                .prop('totalSignets');
            return set(
                O.modify(lens)(signetCount =>
                    Math.min(500, signetCount + value)
                )
            );
        },
        decreaseSignetCount(value) {
            const lens = O.optic<BuilderState>()
                .prop('characterData')
                .prop('totalSignets');
            return set(
                O.modify(lens)(signetCount => Math.max(0, signetCount - value))
            );
        },
        setCharacterLevel(level) {
            const lens = O.optic<BuilderState>()
                .prop('characterData')
                .prop('level');
            return set(O.modify(lens)(() => Math.max(0, level)));
        },
    }));
};
