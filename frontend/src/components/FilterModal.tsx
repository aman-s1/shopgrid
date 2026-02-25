import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import { CategorySkeleton } from './Skeleton';

import { useShop } from '../context/ShopContext';

export function FilterModal() {
  const {
    isFilterOpen,
    setIsFilterOpen,
    categories,
    selectedCategory,
    handleCategoryChange,
    loading,
  } = useShop();

  const isOpen = isFilterOpen;
  const onClose = () => setIsFilterOpen(false);
  const onSelectCategory = handleCategoryChange;
  const isLoading = loading;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Backdrop - full screen to catch clicks */}
      <div className="absolute inset-0 bg-transparent" onClick={onClose} />

      {/* Dropdown Content */}
      <div className="layout-container relative h-full">
        <div className="animate-fade-in-down absolute top-24 right-6 w-full max-w-sm overflow-hidden rounded-[2rem] border border-white/10 bg-[#111118]/95 shadow-2xl shadow-blue-500/20 backdrop-blur-3xl sm:right-10">
          <div className="flex items-center justify-between border-b border-white/5 p-6 pb-4">
            <h2 className="text-lg font-bold tracking-tight text-white">
              Categories
            </h2>
            <button
              onClick={onClose}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/5 text-gray-400 transition-all hover:bg-white/10 hover:text-white"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="scrollbar-hide max-h-[50vh] overflow-y-auto p-6 pt-4">
            {isLoading ? (
              <CategorySkeleton />
            ) : (
              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={() => onSelectCategory('')}
                  className={`flex items-center justify-between rounded-xl border p-3.5 text-left transition-all duration-300 ${
                    selectedCategory === ''
                      ? 'border-blue-500/50 bg-blue-500/10 text-white shadow-lg shadow-blue-500/5'
                      : 'border-white/5 bg-white/5 text-gray-400 hover:border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="text-sm font-medium">All Categories</span>
                  {selectedCategory === '' && (
                    <CheckIcon className="h-4 w-4 text-blue-400" />
                  )}
                </button>

                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => onSelectCategory(category)}
                    className={`flex items-center justify-between rounded-xl border p-3.5 text-left transition-all duration-300 ${
                      selectedCategory === category
                        ? 'border-blue-500/50 bg-blue-500/10 text-white shadow-lg shadow-blue-500/5'
                        : 'border-white/5 bg-white/5 text-gray-400 hover:border-white/10 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span className="text-sm font-medium capitalize">
                      {category}
                    </span>
                    {selectedCategory === category && (
                      <CheckIcon className="h-4 w-4 text-blue-400" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
