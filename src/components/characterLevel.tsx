'use client';

import { useBuilderStore } from '~/zustand/builderProvider';
import { Label } from './ui/label';
import { useEffect } from 'react';

const CharacterLevel = () => {
    const planner = useBuilderStore(state => state);
    useEffect(() => {
        //calculate character level
        const newCharLevel = Math.ceil(
            (Object.values(planner.characterData.stats).reduce(
                (acc, next) => acc + next,
                0
            ) -
                planner.characterData.totalSignets +
                Object.values(planner.characterData.statQuests).reduce(
                    (acc, next) => acc + Number(next),
                    0
                )) /
                5
        );
        planner.setCharacterLevel(newCharLevel);
    }, [
        planner.characterData.stats,
        planner.characterData.totalSignets,
        planner.characterData.statQuests,
    ]);
    return <Label>Level: {planner.characterData.level}</Label>;
};

export default CharacterLevel;
