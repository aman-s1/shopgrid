import { useState, useEffect } from 'react';
import { ProductGrid } from './components/ProductGrid';
import { Navbar } from './components/Navbar';
import { Pagination } from './components/Pagination';
import { FilterModal } from './components/FilterModal';
import { useProducts } from './hooks/useProducts';



function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('page') || '1', 10);
  });

  const [selectedCategory, setSelectedCategory] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('category') || '';
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { products, loading, error, pagination, categories } = useProducts(currentPage, 8, '', selectedCategory);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('page', currentPage.toString());
    if (selectedCategory) {
      url.searchParams.set('category', selectedCategory);
    } else {
      url.searchParams.delete('category');
    }
    window.history.pushState({}, '', url.toString());
  }, [currentPage, selectedCategory]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when filter changes
    setIsFilterOpen(false); // Close modal immediately
  };



  return (
    <div className="flex min-h-screen flex-col bg-[#0f0f13] font-sans text-gray-100">
      <Navbar onOpenFilter={() => setIsFilterOpen(true)} activeFilter={!!selectedCategory} />

      <main className="layout-container flex flex-grow flex-col pt-32 pb-24">
        <div className={`flex w-full flex-grow flex-col transition-opacity duration-300 ${loading ? 'opacity-50' : 'opacity-100'}`}>
          <ProductGrid
            key={`${currentPage}-${selectedCategory}`}
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

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategoryChange}
      />
    </div>

  );
}



export default App;
