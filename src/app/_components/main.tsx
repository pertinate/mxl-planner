'use client';

import { signIn, useSession } from 'next-auth/react';
import { redirect, RedirectType } from 'next/navigation';
import { Button } from '~/components/ui/button';

export function Main() {
    const session = useSession();
    console.log(session);
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
                    }}
                >
                    Create New
                </Button>
            </div>
        </main>
    );
}
