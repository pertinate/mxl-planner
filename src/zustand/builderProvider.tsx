// src/providers/counter-store-provider.tsx
'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';

import {
    BuilderState,
    type BuilderStore,
    createCounterStore,
    initBuilderStore,
} from '~/zustand/builderStore';

export type BuilderStoreApi = ReturnType<typeof createCounterStore>;

export const BuilderStoreContext = createContext<BuilderStoreApi | undefined>(
    undefined
);

export interface BuilderStoreProviderProps {
    children: ReactNode;
    state?: BuilderState;
}

export const BuilderStoreProvider = ({
    children,
    state,
}: BuilderStoreProviderProps) => {
    const storeRef = useRef<BuilderStoreApi>();
    if (!storeRef.current) {
        storeRef.current = createCounterStore(initBuilderStore(state));
    }

    return (
        <BuilderStoreContext.Provider value={storeRef.current}>
            {children}
        </BuilderStoreContext.Provider>
    );
};

export const useBuilderStore = <T,>(
    selector: (store: BuilderStore) => T
): T => {
    const builderStoreContext = useContext(BuilderStoreContext);

    if (!builderStoreContext) {
        throw new Error(
            `useBuilderStore must be used within BuilderStoreProvider`
        );
    }

    return useStore(builderStoreContext, selector);
};
