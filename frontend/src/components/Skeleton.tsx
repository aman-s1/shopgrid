interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
    return (
        <div className={`shimmer animate-pulse rounded-md bg-white/5 ring-1 ring-white/5 ${className}`}></div>
    );
}

export function ProductSkeleton() {
    return (
        <div className="shimmer flex h-full animate-pulse flex-col overflow-hidden rounded-[2rem] border border-white/5 bg-[#111118] shadow-lg backdrop-blur-xl">
            {/* Image Placeholder */}
            <div className="relative aspect-square w-full overflow-hidden bg-white/5 sm:aspect-[4/3]">
                <div className="absolute top-4 left-4 h-6 w-16 rounded-full bg-white/10"></div>
            </div>

            <div className="flex flex-grow flex-col p-6 sm:p-7">
                {/* Category Placeholder */}
                <div className="mb-2 h-4 w-20 rounded bg-white/5"></div>

                {/* Title Placeholder */}
                <div className="mb-3 h-6 w-3/4 rounded-md bg-white/10"></div>

                {/* Price Placeholder */}
                <div className="mb-6 h-7 w-24 rounded-md bg-gradient-to-r from-white/10 to-transparent"></div>

                {/* Footer Placeholder */}
                <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
                    <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-3 w-3 rounded-full bg-white/5"></div>
                        ))}
                    </div>
                    <div className="h-10 w-24 rounded-xl bg-white/5"></div>
                </div>
            </div>
        </div>
    );
}

export function ProductGridSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 xl:grid-cols-4 xl:gap-10">
            {[...Array(8)].map((_, i) => (
                <ProductSkeleton key={i} />
            ))}
        </div>
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

