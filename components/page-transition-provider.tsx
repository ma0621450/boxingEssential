"use client";

import { createContext, useContext, useState, useTransition, ReactNode } from "react";
import { useRouter } from "next/navigation";

const PageTransitionContext = createContext<{
    isPending: boolean;
    navigate: (url: string) => void;
}>({
    isPending: false,
    navigate: () => { },
});

export function PageTransitionProvider({ children }: { children: ReactNode }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const navigate = (url: string) => {
        startTransition(() => {
            router.push(url);
        });
    };

    return (
        <PageTransitionContext.Provider value={{ isPending, navigate }}>
            {children}
        </PageTransitionContext.Provider>
    );
}

export function usePageTransition() {
    return useContext(PageTransitionContext);
}