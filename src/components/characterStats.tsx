'use client';

import { useBuilderStore } from '~/zustand/builderProvider';
import { Label } from './ui/label';
import { type z } from 'zod';
import { type StatsSchema } from '~/planner/characterSchema';
import CharacterStatGroup from './characterStatGroup';
import SignetCount from './signetCount';

const CharacterStats = () => {
    const planner = useBuilderStore(store => store);

    return (
        <>
            {Object.keys(planner.characterData.stats).map(key => (
                <CharacterStatGroup
                    key={`char-stat-${key}`}
                    stat={key as keyof z.infer<typeof StatsSchema>}
                />
            ))}

            <SignetCount />
            <div className='flex flex-col gap-4'>
                <Label>
                    Total Strength: {planner.characterData.stats.strength}
                </Label>
                <Label>
                    Total Dexterity: {planner.characterData.stats.dexterity}
                </Label>
                <Label>
                    Total Vitality: {planner.characterData.stats.vitality}
                </Label>
                <Label>
                    Total Energy: {planner.characterData.stats.energy}
                </Label>
            </div>
        </>
    );
};

export default CharacterStats;
