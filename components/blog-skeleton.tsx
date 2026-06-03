export function BlogSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                    <div className="aspect-video bg-muted rounded-lg mb-3" />
                    <div className="h-5 w-3/4 bg-muted rounded mb-2" />
                    <div className="h-4 w-full bg-muted rounded mb-1" />
                    <div className="h-4 w-2/3 bg-muted rounded" />
                </div>
            ))}
        </div>
    );
}