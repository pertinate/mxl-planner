import { redirect } from 'next/navigation';
import CharacterDropdown from '~/components/characterDropdown';
import CharacterStats from '~/components/characterStats';
import SkillTree from '~/components/skillTree';
import { Button } from '~/components/ui/button';
import { ButtonGroup } from '~/components/ui/buttonGroup';
import { Card, CardHeader, CardTitle } from '~/components/ui/card';
import { Label } from '~/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '~/components/ui/toggle-group';
import { api } from '~/trpc/server';
import { BuilderStoreProvider } from '~/zustand/builderProvider';

export default async function Page({
    params: Params,
}: Readonly<{
    params: Promise<{ code: string }>;
}>) {
    const params = await Params;
    const code = params.code;

    if (!code) {
        return redirect('/planners');
    }
    const planner = await api.planner.get(code);

    return (
        <BuilderStoreProvider state={planner}>
            <main className='flex h-screen flex-col gap-2 p-2'>
                <Card>
                    <div className='flex justify-between p-2'>
                        <div>
                            <Label>{planner.name}</Label>
                        </div>
                        <ButtonGroup>
                            <Button variant={'destructive'}>Reset</Button>
                            <Button>Save</Button>
                        </ButtonGroup>
                    </div>
                </Card>
                <div className='flex h-full gap-2'>
                    {/* <Card>
                        <CardHeader>
                            <CardTitle>Character</CardTitle>
                        </CardHeader>
                        <CardContent>
                            
                        </CardContent>
                    </Card> */}
                    <Card className='flex-grow'>
                        <Tabs defaultValue='character' className=''>
                            <TabsList>
                                <TabsTrigger value='character'>
                                    Character
                                </TabsTrigger>
                                <TabsTrigger value='gear'>Gear</TabsTrigger>
                            </TabsList>
                            <TabsContent value='character'>
                                <div className='flex gap-4 p-4'>
                                    <div className='flex w-fit flex-col items-center justify-center gap-4'>
                                        <CharacterDropdown />
                                        <div>
                                            <Label>
                                                Level:{' '}
                                                {planner.characterData.level}
                                            </Label>
                                        </div>
                                        <CharacterStats />
                                    </div>
                                    <div className='flex gap-4'>
                                        <Card className='h-fit w-fit'>
                                            <CardHeader className='p-3'>
                                                <CardTitle>
                                                    Skill Points
                                                </CardTitle>
                                            </CardHeader>
                                            <div className='flex flex-col gap-2 p-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <Label>Normal</Label>
                                                    <ToggleGroup type='multiple'>
                                                        <ToggleGroupItem value='n_den'>
                                                            Den
                                                        </ToggleGroupItem>
                                                        <ToggleGroupItem value='n_radament'>
                                                            Radament
                                                        </ToggleGroupItem>
                                                        <ToggleGroupItem value='n_izual'>
                                                            Izual
                                                        </ToggleGroupItem>
                                                    </ToggleGroup>
                                                </div>
                                                <div className='flex flex-col gap-2'>
                                                    <Label>Nightmare</Label>
                                                    <ToggleGroup type='multiple'>
                                                        <ToggleGroupItem value='n_den'>
                                                            Den
                                                        </ToggleGroupItem>
                                                        <ToggleGroupItem value='n_radament'>
                                                            Radament
                                                        </ToggleGroupItem>
                                                        <ToggleGroupItem value='n_izual'>
                                                            Izual
                                                        </ToggleGroupItem>
                                                    </ToggleGroup>
                                                </div>
                                                <div className='flex flex-col gap-2'>
                                                    <Label>Hell</Label>
                                                    <ToggleGroup
                                                        type='multiple'
                                                        orientation='vertical'
                                                    >
                                                        <ToggleGroupItem value='n_den'>
                                                            Den
                                                        </ToggleGroupItem>
                                                        <ToggleGroupItem value='n_radament'>
                                                            Radament
                                                        </ToggleGroupItem>
                                                        <ToggleGroupItem value='n_izual'>
                                                            Izual
                                                        </ToggleGroupItem>
                                                        <ToggleGroupItem value='n_izual'>
                                                            Signet of Skill
                                                        </ToggleGroupItem>
                                                    </ToggleGroup>
                                                </div>
                                            </div>
                                        </Card>
                                        <Card className='h-fit w-fit'>
                                            <CardHeader className='p-3'>
                                                <CardTitle>
                                                    Stat Points
                                                </CardTitle>
                                            </CardHeader>
                                            <div className='flex flex-col gap-2 p-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <Label>Normal</Label>
                                                    <ToggleGroup
                                                        type='multiple'
                                                        orientation='vertical'
                                                    >
                                                        <ToggleGroupItem value='n_den'>
                                                            Lam Esen
                                                        </ToggleGroupItem>
                                                    </ToggleGroup>
                                                </div>
                                                <div className='flex flex-col gap-2'>
                                                    <Label>Nightmare</Label>
                                                    <ToggleGroup
                                                        type='multiple'
                                                        orientation='vertical'
                                                    >
                                                        <ToggleGroupItem value='n_den'>
                                                            Lam Esen
                                                        </ToggleGroupItem>
                                                    </ToggleGroup>
                                                </div>
                                                <div className='flex flex-col gap-2'>
                                                    <Label>Hell</Label>
                                                    <ToggleGroup
                                                        type='multiple'
                                                        orientation='vertical'
                                                    >
                                                        <ToggleGroupItem value='n_den'>
                                                            Lam Esen
                                                        </ToggleGroupItem>
                                                    </ToggleGroup>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value='gear' className=''>
                                <div>gear</div>
                            </TabsContent>
                        </Tabs>
                    </Card>

                    <SkillTree />
                </div>
            </main>
        </BuilderStoreProvider>
    );
}
