import { Link, useLocation } from 'react-router-dom';
import {
  ShoppingBagIcon,
  SparklesIcon,
  MagnifyingGlassIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const {
    searchQuery,
    handleSearch,
    handleReset,
    setIsFilterOpen,
    selectedCategory,
  } = useShop();
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const isShopPage = location.pathname === '/shop';
  const activeFilter = !!selectedCategory;

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-[#050508]/80 backdrop-blur-xl">
      <div className="layout-container">
        <div className="flex h-20 items-center justify-between gap-8">
          {/* Logo */}
          <Link
            to="/"
            onClick={handleReset}
            className="group flex shrink-0 items-center gap-2.5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/20 transition-transform group-hover:scale-110">
              <ShoppingBagIcon className="h-6 w-6 text-white" />
            </div>
            <span className="hidden text-xl font-black tracking-tighter text-white sm:block">
              SHOP<span className="text-blue-500">GRID</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            <Link
              to="/"
              className="rounded-xl px-4 py-2 text-sm font-bold text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="rounded-xl px-4 py-2 text-sm font-bold text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              Shop
            </Link>
          </div>

          {/* Search Bar (Only on Shop page) */}
          <div
            className={`max-w-xl flex-grow transition-opacity duration-300 ${isShopPage ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
          >
            <div className="group relative">
              <div className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-blue-400">
                <MagnifyingGlassIcon className="h-5 w-5" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full rounded-2xl border border-white/5 bg-white/5 py-3 pr-4 pl-12 text-sm font-medium text-white transition-all placeholder:text-gray-600 focus:border-blue-500/30 focus:bg-white/[0.07] focus:ring-4 focus:ring-blue-500/10 focus:outline-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {isShopPage && (
              <button
                onClick={() => setIsFilterOpen(true)}
                className={`relative flex cursor-pointer items-center justify-center rounded-full border border-white/5 p-2.5 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 ${activeFilter ? 'bg-blue-500/10 text-blue-400' : 'bg-white/5 text-white'}`}
              >
                <FunnelIcon className="h-5 w-5" />
                {activeFilter && (
                  <span className="absolute -top-1 -right-1 h-3 w-3 animate-pulse rounded-full bg-blue-500 shadow-lg shadow-blue-500/50"></span>
                )}
              </button>
            )}

            {isAuthenticated ? (
              <>
                <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 sm:flex">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500">
                    <UserIcon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-xs font-bold text-gray-200">
                    {user?.username}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/5 p-2.5 text-gray-400 transition-all hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-500"
                  title="Logout"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-5 py-2.5 text-sm font-bold text-gray-400 transition-colors hover:text-white"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="hidden items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-black text-black shadow-lg shadow-white/5 transition-all hover:scale-[1.02] active:scale-95 sm:flex"
                >
                  Join Now
                  <SparklesIcon className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
