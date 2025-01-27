import type { z } from 'zod';
import type { CharacterSchema } from './characterSchema';
import { paladinTree } from './characterSkillTrees/paladinTree';
import { paladinPositionData } from './characterSkillTrees/paladinPositionData';

export const getSkillTree = (character: z.infer<typeof CharacterSchema>) => {
    switch (character) {
        case 'Paladin':
            return paladinTree;
        case 'Sorceress':
            return paladinTree;
    }
};

export const getPositionData = (character: z.infer<typeof CharacterSchema>) => {
    switch (character) {
        case 'Paladin':
            return paladinPositionData;
        case 'Sorceress':
            return paladinPositionData;
    }
};
