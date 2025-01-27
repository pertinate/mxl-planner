import { type z } from 'zod';
import { type StatsSchema } from '~/planner/characterSchema';
import { useBuilderStore } from '~/zustand/builderProvider';
import { Button } from './ui/button';
import { Label } from './ui/label';

type Props = {
    stat: keyof z.infer<typeof StatsSchema>;
};

const CharacterStatGroup = (props: Props) => {
    const planner = useBuilderStore(store => store);
    return (
        <div className='flex w-full items-center justify-between gap-2'>
            <div className='flex gap-2'>
                <Button
                    size={'sm'}
                    onClick={() => planner.reduceCharacterStat(props.stat, 25)}
                >
                    -25
                </Button>
                <Button
                    size={'sm'}
                    onClick={() => planner.reduceCharacterStat(props.stat, 1)}
                >
                    -
                </Button>
            </div>
            <Label>
                {`${props.stat.charAt(0).toUpperCase()}${props.stat.slice(1)}`}:{' '}
                {planner.characterData.baseStats[props.stat] +
                    planner.characterData.stats[props.stat]}
            </Label>
            <div className='flex gap-2'>
                <Button
                    size={'sm'}
                    onClick={() => planner.increaseCharacterStat(props.stat, 1)}
                >
                    +
                </Button>
                <Button
                    size={'sm'}
                    onClick={() =>
                        planner.increaseCharacterStat(props.stat, 25)
                    }
                >
                    +25
                </Button>
            </div>
        </div>
    );
};

export default CharacterStatGroup;
