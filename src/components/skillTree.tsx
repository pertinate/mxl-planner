'use client';

import { useBuilderStore } from '~/zustand/builderProvider';
import Skill from './skill';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from './ui/dropdown-menu';
import { useEffect, useState } from 'react';

const SkillTree = () => {
    const planner = useBuilderStore(state => state);
    const [currentTree, setTree] = useState(0);

    useEffect(() => {
        setTree(0);
    }, [planner.character]);

    return (
        <Card className='h-fit min-h-full'>
            <CardHeader>
                <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent className='p-2'>
                <div className='flex flex-col gap-4'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button>
                                {
                                    planner.characterData.skillTree[currentTree]
                                        ?.name
                                }
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Skill Trees</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {planner.characterData.skillTree.map(
                                (tree, treeIdx) => (
                                    <DropdownMenuItem
                                        key={tree.name}
                                        onClick={() => setTree(treeIdx)}
                                    >
                                        {tree.name}
                                    </DropdownMenuItem>
                                )
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className='flex pt-2'>
                    <div className='grid flex-1 grid-cols-3 grid-rows-6 gap-4 overflow-auto'>
                        {planner.characterData.skillTree[
                            currentTree
                        ]?.skills.map((skill, skillIdx) => (
                            <Skill
                                key={skill.name}
                                treeIdx={currentTree}
                                skillIdx={skillIdx}
                            />
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default SkillTree;
