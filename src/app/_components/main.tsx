'use client';

import { useSession } from 'next-auth/react';
import { redirect, RedirectType, useRouter } from 'next/navigation';
import { Button } from '~/components/ui/button';
import { api } from '~/trpc/react';

export function Main() {
    const session = useSession();
    const plannerCreate = api.planner.create.useMutation();
    const router = useRouter();
    return (
        <main className='flex h-full items-center justify-center'>
            {
                //show & filter builds
            }
            <div className='flex gap-4'>
                <Button>View Planners</Button>
                <Button
                    onClick={() => {
                        console.log(session);
                        if (!session || session.status == 'unauthenticated') {
                            return redirect(
                                '/api/auth/signin',
                                RedirectType.push
                            );
                        }

                        plannerCreate
                            .mutateAsync()
                            .then(id => {
                                router.push(`/planners/${id}`);
                            })
                            .catch(console.error);
                    }}
                >
                    Create New
                </Button>
            </div>
        </main>
    );
}
