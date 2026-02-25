import { ProductGrid } from './components/ProductGrid';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen bg-[#0f0f13] font-sans text-gray-100">
      <Navbar />

      <main className="layout-container mt-20 pt-16 pb-24">
        <div className="w-full">
          <ProductGrid />
        </div>
      </main>
    </div>
  );
}

export default App;
