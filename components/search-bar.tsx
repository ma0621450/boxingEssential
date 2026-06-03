"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { usePageTransition } from "@/components/page-transition-provider";

export function SearchBar({
    initialQuery = "",
    basePath = "/blog"
}: {
    initialQuery?: string;
    basePath?: string;
}) {
    const [query, setQuery] = useState(initialQuery);
    const { navigate } = usePageTransition();
    const searchParams = useSearchParams();
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const trimmed = query.trim();
        const currentQ = searchParams.get("q") || "";

        if (trimmed === currentQ) return;

        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());

            if (trimmed) {
                params.set("q", trimmed);
                params.delete("page");
            } else {
                params.delete("q");
            }

            navigate(`${basePath}?${params.toString()}`);
        }, 400);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [query, navigate, searchParams, basePath]);

    const handleClear = () => {
        setQuery("");
        const params = new URLSearchParams(searchParams.toString());
        params.delete("q");
        params.delete("page");
        navigate(`${basePath}?${params.toString()}`);
    };

    return (
        <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
            {query && (
                <button
                    type="button"
                    onClick={handleClear}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-muted text-muted-foreground"
                >
                    <X className="h-3.5 w-3.5" />
                </button>
            )}
        </div>
    );
}