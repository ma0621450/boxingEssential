export default function BlogLoading() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
            <div className="mb-8 animate-pulse">
                <div className="h-10 w-64 bg-muted rounded mb-2" />
                <div className="h-5 w-96 bg-muted rounded" />
            </div>
            <div className="flex gap-4 mb-6">
                <div className="h-9 w-80 bg-muted rounded animate-pulse" />
                <div className="h-9 w-48 bg-muted rounded animate-pulse" />
            </div>
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
        </div>
    );
}