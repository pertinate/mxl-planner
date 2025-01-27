'use client';

import { CharacterSchema } from '~/planner/characterSchema';
import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from './ui/dropdown-menu';
import { useBuilderStore } from '~/zustand/builderProvider';

const CharacterDropdown = () => {
    const state = useBuilderStore(state => state);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className='w-full'>{state.character}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Characters</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {CharacterSchema.options.map(entry => (
                    <DropdownMenuItem
                        key={`select-${entry.value}`}
                        onClick={() => state.changeCharacter(entry.value)}
                    >
                        {entry.value}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default CharacterDropdown;
