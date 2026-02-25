import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/5 bg-[#111118] shadow-md backdrop-blur-xl transition-all duration-500 hover:border-white/10 hover:shadow-2xl hover:shadow-blue-500/10">
      {/* Image Container */}
      <div className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden bg-white/5 p-4 sm:aspect-square sm:p-6">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain drop-shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-105"
          loading="lazy"
        />

        {/* Overlay gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111118] via-transparent to-transparent opacity-40 transition-opacity duration-500 group-hover:opacity-60"></div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[10px] font-black tracking-[0.2em] text-white uppercase shadow-xl backdrop-blur-xl sm:px-4 sm:py-2 sm:text-xs">
          {product.category}
        </div>
      </div>

      {/* Content Area */}
      <div className="relative z-20 flex flex-grow flex-col bg-gradient-to-t from-[#111118] via-[#111118]/90 to-[#111118]/40 p-5 sm:p-6">
        <h3 className="mb-4 line-clamp-2 text-base leading-snug font-bold text-gray-100 transition-colors duration-300 sm:text-lg">
          {product.title}
        </h3>

        <div className="mt-auto flex items-center border-t border-white/5 pt-4 sm:pt-5">
          <span className="text-xl font-black tracking-tight text-white drop-shadow-md sm:text-2xl">
            <span className="mr-1 text-lg text-blue-500">₹</span>
            {product.price.toLocaleString('en-IN', {
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
