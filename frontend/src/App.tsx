import { ProductGrid } from './components/ProductGrid';
import { Navbar } from './components/Navbar';
import { Pagination } from './components/Pagination';
import { FilterModal } from './components/FilterModal';
import { useShop } from './context/ShopContext';
import { PaginationSkeleton } from './components/Skeleton';

function App() {
  const {
    loading,
    pagination,
  } = useShop();


  return (
    <div className="flex min-h-screen flex-col bg-[#0f0f13] font-sans text-gray-100">
      <Navbar />

      <main className="layout-container flex flex-grow flex-col pt-32 pb-24">
        <div className={`flex w-full flex-grow flex-col transition-opacity duration-300 ${loading ? 'opacity-50' : 'opacity-100'}`}>
          <ProductGrid />

          {pagination ? (
            <div className="mt-auto">
              <Pagination />
            </div>
          ) : loading ? (
            <PaginationSkeleton />
          ) : null}
        </div>
      </main>

      <FilterModal />
    </div>
  );
}

export default App;
