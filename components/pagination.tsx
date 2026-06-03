"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePageTransition } from "@/components/page-transition-provider";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    selectedCategory?: string;
    searchQuery?: string;
    basePath?: string;
}

export function Pagination({
    currentPage,
    totalPages,
    selectedCategory = "ALL",
    searchQuery,
    basePath = "/blog",
}: PaginationProps) {
    const { isPending, navigate } = usePageTransition();

    const getPageUrl = (page: number) => {
        const params = new URLSearchParams();

        if (searchQuery) {
            params.set("q", searchQuery);
        } else if (selectedCategory !== "ALL") {
            params.set("category", selectedCategory);
        }

        if (page > 1) {
            params.set("page", page.toString());
        }

        const queryString = params.toString();
        return queryString ? `${basePath}?${queryString}` : basePath;
    };

    const handleClick = (page: number) => {
        if (page === currentPage || isPending) return;
        navigate(getPageUrl(page));
    };

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const getVisiblePages = () => {
        if (totalPages <= 5) return pages;
        if (currentPage <= 3) return [...pages.slice(0, 5), "...", totalPages];
        if (currentPage >= totalPages - 2)
            return [1, "...", ...pages.slice(totalPages - 5)];
        return [
            1,
            "...",
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "...",
            totalPages,
        ];
    };

    return (
        <nav className="flex justify-center items-center gap-1">
            <button
                onClick={() => handleClick(currentPage - 1)}
                disabled={currentPage === 1 || isPending}
                className="p-2 rounded-md hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Previous page"
            >
                <ChevronLeft className="h-4 w-4" />
            </button>

            {getVisiblePages().map((page, i) =>
                page === "..." ? (
                    <span key={`ellipsis-${i}`} className="px-2 text-muted-foreground">
                        ...
                    </span>
                ) : (
                    <button
                        key={`page-${page}`}
                        onClick={() => handleClick(page as number)}
                        disabled={isPending}
                        className={`min-w-[36px] h-9 px-3 rounded-md text-sm font-medium transition-colors ${currentPage === page
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-muted text-foreground"
                            } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
                        aria-current={currentPage === page ? "page" : undefined}
                    >
                        {page}
                    </button>
                )
            )}

            <button
                onClick={() => handleClick(currentPage + 1)}
                disabled={currentPage === totalPages || isPending}
                className="p-2 rounded-md hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Next page"
            >
                <ChevronRight className="h-4 w-4" />
            </button>
        </nav>
    );
}