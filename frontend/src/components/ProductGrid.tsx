import { ProductCard } from './ProductCard';
import type { Product } from '../types';

function SkeletonCard() {
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


interface ProductGridProps {
    products: Product[];
    loading: boolean;
    error: string | null;
}

export function ProductGrid({ products, loading, error }: ProductGridProps) {


    if (loading) {
        return (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 xl:grid-cols-4 xl:gap-10">
                {[...Array(8)].map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="mx-4 mx-auto mt-12 max-w-2xl rounded-[2rem] border border-red-500/20 bg-red-500/10 p-8 text-center text-red-200 shadow-2xl shadow-red-500/10 backdrop-blur-md sm:mx-0">
                <div className="inline-flex max-w-md flex-col items-center">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20">
                        <svg
                            className="h-8 w-8 text-red-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>
                    <h3 className="mb-3 text-2xl font-bold tracking-tight text-white">
                        {error}
                    </h3>
                    <p className="text-base leading-relaxed text-red-300 opacity-80">
                        Make sure your backend server is running and the MongoDB connection
                        is configured correctly in your .env file.
                    </p>
                </div>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="px-4 py-24 text-center sm:py-32">
                <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-white/5 shadow-inner shadow-white/5">
                    <svg
                        className="h-10 w-10 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </div>
                <h3 className="mb-4 text-3xl font-bold tracking-tight text-gray-200">
                    No products found
                </h3>
                <p className="mx-auto max-w-md text-lg leading-relaxed text-gray-400">
                    We couldn't find anything matching your search. Try adjusting the
                    filters or searching for something else.
                </p>
            </div>
        );
    }

    return (
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 xl:grid-cols-4 xl:gap-10">
            {products.map((product) => (
                <div
                    key={product._id}
                    className="animate-fade-in-up h-full"
                    style={{ animationFillMode: 'both' }}
                >
                    <ProductCard product={product} />
                </div>
            ))}
        </div>
    );
}
