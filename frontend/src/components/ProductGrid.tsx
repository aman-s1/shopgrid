import { useProducts } from '../hooks/useProducts';
import { ProductCard } from './ProductCard';

function SkeletonCard() {
    return (
        <div className="bg-[#111118] rounded-[2rem] overflow-hidden border border-white/5 flex flex-col h-full animate-pulse shadow-lg backdrop-blur-xl">
            <div className="aspect-square sm:aspect-[4/3] w-full bg-white/5"></div>
            <div className="p-6 sm:p-7 flex flex-col flex-grow">
                <div className="h-6 bg-white/10 rounded-md w-3/4 mb-3"></div>
                <div className="h-5 bg-white/10 rounded-md w-1/2 mb-6"></div>
                <div className="mt-auto pt-4 flex items-end justify-between border-t border-white/5">
                    <div className="h-8 bg-white/10 rounded-md w-1/3"></div>
                    <div className="h-10 w-10 bg-white/10 rounded-2xl sm:hidden flex-shrink-0"></div>
                </div>
            </div>
        </div>
    );
}

export function ProductGrid() {
    const { products, loading, error } = useProducts();

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 xl:gap-10">
                {[...Array(8)].map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="mx-4 sm:mx-0 bg-red-500/10 border border-red-500/20 text-red-200 p-8 rounded-[2rem] text-center max-w-2xl mx-auto mt-12 backdrop-blur-md shadow-2xl shadow-red-500/10">
                <div className="inline-flex max-w-md flex-col items-center">
                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
                        <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-white tracking-tight">{error}</h3>
                    <p className="text-base opacity-80 leading-relaxed text-red-300">Make sure your backend server is running and the MongoDB connection is configured correctly in your .env file.</p>
                </div>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-24 sm:py-32 px-4">
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner shadow-white/5">
                    <svg className="w-10 h-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                </div>
                <h3 className="text-3xl font-bold text-gray-200 mb-4 tracking-tight">No products found</h3>
                <p className="text-lg text-gray-400 max-w-md mx-auto leading-relaxed">We couldn't find anything matching your search. Try adjusting the filters or searching for something else.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 xl:gap-10">
            {products.map((product) => (
                <div key={product._id} className="h-full animate-fade-in-up" style={{ animationFillMode: 'both' }}>
                    <ProductCard product={product} />
                </div>
            ))}
        </div>
    );
}
