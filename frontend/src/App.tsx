import { useState, useEffect } from 'react';
import { ProductGrid } from './components/ProductGrid';
import { Navbar } from './components/Navbar';
import { Pagination } from './components/Pagination';
import { useProducts } from './hooks/useProducts';


function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('page') || '1', 10);
  });

  const { products, loading, error, pagination } = useProducts(currentPage);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('page', currentPage.toString());
    window.history.pushState({}, '', url.toString());
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#0f0f13] font-sans text-gray-100">
      <Navbar />

      <main className="layout-container flex flex-grow flex-col pt-32 pb-24">
        <div className={`flex w-full flex-grow flex-col transition-opacity duration-300 ${loading ? 'opacity-50' : 'opacity-100'}`}>
          <ProductGrid
            key={currentPage}
            products={products}
            loading={loading}
            error={error}
          />

          {pagination && (
            <div className="mt-auto">

              <Pagination
                currentPage={currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}



export default App;
