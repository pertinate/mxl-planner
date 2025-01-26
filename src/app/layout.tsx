import '~/styles/globals.css';

import { GeistSans } from 'geist/font/sans';
import { type Metadata } from 'next';

import { TRPCReactProvider } from '~/trpc/react';
import { ThemeProvider } from '~/components/themeProvider';
import { SessionProvider } from 'next-auth/react';
import { auth } from '~/server/auth';

export const metadata: Metadata = {
    title: 'MXL Planner',
    description: 'MXL Planner',
    icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default async function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const session = await auth();
    return (
        <html
            lang='en'
            className={`${GeistSans.variable}`}
            suppressHydrationWarning
        >
            <body>
                <SessionProvider session={session}>
                    <ThemeProvider
                        attribute='class'
                        defaultTheme='dark'
                        enableSystem
                        disableTransitionOnChange
                    >
                        <TRPCReactProvider>{children}</TRPCReactProvider>
                    </ThemeProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
