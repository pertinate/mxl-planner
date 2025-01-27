'use client';

import Image from 'next/image';
import { useMemo } from 'react';
import { cn } from '~/lib/utils';
import { useBuilderStore } from '~/zustand/builderProvider';
import { ButtonGroup } from './ui/buttonGroup';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { getPositionData } from '~/planner/characters';
import { SkillSchema } from '~/planner/characterSchema';
import { z } from 'zod';

type Props = {
    // rowStart: number;
    // colStart: number;
    treeIdx: number;
    skillIdx: number;
};

const Skill = (props: Props) => {
    const builder = useBuilderStore(store => store);
    const skill = useMemo<z.infer<typeof SkillSchema>>(
        () =>
            builder.characterData.skillTree[props.treeIdx]!.skills[
                props.skillIdx
            ]!,
        [props.treeIdx, props.skillIdx, builder]
    );
    const positionData = getPositionData(builder.character);
    return (
        <div
            className={cn(
                'relative col-span-1 row-span-1 flex w-fit flex-col items-center justify-center gap-2',
                `row-start-${positionData[skill.name]?.rowStart}`,
                `col-start-${positionData[skill.name]?.colStart}`
            )}
        >
            <div className='relative h-fit w-fit'>
                <Image
                    src={`/images/tree/${skill?.isPassive ? 'passive' : 'skill'}.png`}
                    alt={''}
                    width={60}
                    height={80}
                    className='z-2'
                />
                <span className='absolute bottom-[1.35rem] left-0 right-0 mx-auto text-center'>
                    {skill?.currentLevel}/{skill?.maxLevel}
                </span>
                <Tooltip>
                    <TooltipTrigger>
                        <Image
                            src={`/images/tree/paladin/${skill?.name}.png`}
                            alt={''}
                            width={54}
                            height={54}
                            className='z-1 absolute left-1 top-1'
                        />
                    </TooltipTrigger>
                    <TooltipContent>{skill?.name}</TooltipContent>
                </Tooltip>
            </div>

            <ButtonGroup className='z-3 absolute -bottom-0'>
                <Button
                    size='sm'
                    className='h-4 w-2 min-w-2'
                    onClick={() =>
                        builder.decrementSkillLevel(
                            props.treeIdx,
                            props.skillIdx
                        )
                    }
                >
                    -
                </Button>
                <Button
                    size='sm'
                    className='h-4 w-2 min-w-2'
                    onClick={() =>
                        builder.incrementSkillLevel(
                            props.treeIdx,
                            props.skillIdx
                        )
                    }
                >
                    +
                </Button>
            </ButtonGroup>
        </div>
    );
};

export default Skill;
