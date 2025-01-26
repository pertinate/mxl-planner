import type { z } from 'zod';
import { CharacterSchema } from './characterSchema';
import { paladinTree } from './characterSkillTrees/paladinTree';

export const getTree = (character: z.infer<typeof CharacterSchema>) => {
    switch (character) {
        case 'Paladin':
            return paladinTree;
        case 'Sorceress':
            return paladinTree;
    }
};
