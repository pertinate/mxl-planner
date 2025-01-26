import { redirect } from 'next/navigation';
import { api } from '~/trpc/server';
import { BuilderStoreProvider } from '~/zustand/builderProvider';

export default async function Page({
    searchParams,
}: Readonly<{
    children: React.ReactNode;
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}>) {
    const params = await searchParams;
    const codeParam = params.code;

    if (!codeParam) {
        return redirect('/planners');
    }

    const codes = Array.isArray(codeParam) ? codeParam : [codeParam];
    const planners = await api.planner.get(codes);

    if (planners.length == 0) {
        return redirect('/planners');
    }

    return <>test</>;
    // return <BuilderStoreProvider></BuilderStoreProvider>;
}
