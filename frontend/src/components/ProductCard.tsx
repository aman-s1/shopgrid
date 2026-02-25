import type { Product } from '../types';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="group relative flex flex-col bg-[#111118] rounded-[2rem] overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-500 shadow-md hover:shadow-2xl hover:shadow-blue-500/10 h-full backdrop-blur-xl">
            {/* Image Container */}
            <div className="relative aspect-[4/5] sm:aspect-square w-full bg-white/5 flex items-center justify-center overflow-hidden p-4 sm:p-6">
                <img
                    src={product.image}
                    alt={product.title}
                    className="object-contain w-full h-full drop-shadow-2xl group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                    loading="lazy"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111118] via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"></div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-xl text-white text-[10px] sm:text-xs font-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-full uppercase tracking-[0.2em] border border-white/10 shadow-xl z-10">
                    {product.category}
                </div>
            </div>

            {/* Content Area */}
            <div className="p-5 sm:p-6 flex flex-col flex-grow z-20 relative bg-gradient-to-t from-[#111118] via-[#111118]/90 to-[#111118]/40">
                <h3 className="text-base sm:text-lg font-bold text-gray-100 leading-snug line-clamp-2 mb-4 transition-colors duration-300 group-hover:text-blue-400">
                    {product.title}
                </h3>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-4 sm:pt-5">
                    <span className="text-xl sm:text-2xl font-black tracking-tight text-white drop-shadow-md">
                        <span className="text-blue-500 mr-1 text-lg">₹</span>{product.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </span>
                    <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-bold text-sm sm:text-base shadow-lg shadow-blue-500/20 transition-all active:scale-95 flex items-center gap-2 group/btn cursor-pointer whitespace-nowrap">
                        <svg className="w-4 h-4 sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        <span className="hidden sm:inline">Add to Cart</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
