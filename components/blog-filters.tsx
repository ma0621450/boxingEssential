"use client";

import { usePathname } from "next/navigation";
import { usePageTransition } from "@/components/page-transition-provider";

type Category = {
    slug: string;
    name: string;
};

export function BlogFilters({
    categories,
    selectedCategory,
}: {
    categories: Category[];
    selectedCategory: string;
}) {
    const { navigate } = usePageTransition();
    const pathname = usePathname();

    function handleCategory(slug: string) {
        const params = new URLSearchParams();
        if (slug !== "ALL") params.set("category", slug);
        params.set("page", "1");
        navigate(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
                <button
                    key={cat.slug}
                    onClick={() => handleCategory(cat.slug)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === cat.slug
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        }`}
                >
                    {cat.name}
                </button>
            ))}
        </div>
    );
}