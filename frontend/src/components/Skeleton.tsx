interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
    return (
        <div className={`shimmer animate-pulse rounded-md bg-white/5 ring-1 ring-white/5 ${className}`}></div>
    );
}

export function CategorySkeleton() {
    return (
        <div className="grid grid-cols-1 gap-2">
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    className="shimmer flex h-12 w-full animate-pulse items-center justify-between rounded-xl border border-white/5 bg-white/5 px-4"
                >
                    <div className="h-4 w-24 rounded bg-white/10"></div>
                    <div className="h-4 w-4 rounded bg-white/10"></div>
                </div>
            ))}
        </div>
    );
}

export function PaginationSkeleton() {
    return (
        <div className="mt-16 flex flex-col items-center space-y-6">
            <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 sm:space-x-2">
                    <Skeleton className="h-11 w-11 rounded-2xl" />
                    <Skeleton className="h-11 w-11 rounded-2xl" />
                </div>
                <div className="flex items-center space-x-1 sm:space-x-2">
                    {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="h-11 w-11 rounded-2xl" />
                    ))}
                </div>
                <div className="flex items-center space-x-1 sm:space-x-2">
                    <Skeleton className="h-11 w-11 rounded-2xl" />
                    <Skeleton className="h-11 w-11 rounded-2xl" />
                </div>
            </div>
        </div>
    );
}
