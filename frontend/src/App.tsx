import { ProductGrid } from './components/ProductGrid';

function App() {
  return (
    <div className="min-h-screen bg-[#0f0f13] text-gray-100 font-sans">
      <header className="sticky top-0 z-50 bg-[#0f0f13]/80 backdrop-blur-xl border-b border-white/5 shadow-sm shadow-blue-500/5">
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 py-5 flex items-center justify-between transition-all">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 drop-shadow-sm hover:scale-[1.02] transition-transform duration-300 cursor-pointer">
            ShopGrid
          </h1>
          <nav className="hidden md:flex gap-8 lg:gap-12 text-sm font-semibold text-gray-400">
            <a href="#" className="hover:text-white hover:bg-white/5 px-4 py-2 rounded-full transition-all duration-300">Home</a>
            <a href="#" className="hover:text-white hover:bg-white/5 px-4 py-2 rounded-full transition-all duration-300">Categories</a>
            <a href="#" className="hover:text-white hover:bg-white/5 px-4 py-2 rounded-full transition-all duration-300">Deals</a>
          </nav>
          <div className="flex items-center space-x-4">
            
          </div>
        </div>
      </header>

      <main className="max-w-screen-2xl mx-auto py-10 sm:py-12">
        <div className="px-6 sm:px-8 mb-10 sm:mb-12 text-center sm:text-left">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4 animate-fade-in-up">
            Featured Products
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl font-medium leading-relaxed animate-fade-in-up" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
            Discover our latest collection of premium items carefully curated to elevate your everyday life.
          </p>
        </div>

        <div className="px-6 sm:px-8">
          <ProductGrid />
        </div>
      </main>
    </div>
  );
}

export default App;
