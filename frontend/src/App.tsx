import { ProductGrid } from './components/ProductGrid';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen bg-[#0f0f13] font-sans text-gray-100">
      <Navbar />

      <main className="mx-auto max-w-screen-2xl py-10 sm:py-12">
        <div className="mb-10 px-6 text-center sm:mb-12 sm:px-8 sm:text-left">
          <p
            className="animate-fade-in-up max-w-2xl text-lg leading-relaxed font-medium text-gray-400 sm:text-xl"
            style={{ animationDelay: '100ms', animationFillMode: 'both' }}
          >
            Discover our latest collection of premium items carefully curated to
            elevate your everyday life.
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
