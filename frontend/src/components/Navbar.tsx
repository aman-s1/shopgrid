import { FunnelIcon, MagnifyingGlassIcon, XMarkIcon, ShoppingBagIcon, HomeIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export function Navbar() {
    const {
        searchQuery,
        selectedCategory,
        handleSearch,
        setIsFilterOpen
    } = useShop();


    const [searchTerm, setSearchTerm] = useState(searchQuery);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setSearchTerm(searchQuery);
    }, [searchQuery]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm.length === 0 || searchTerm.length >= 3) {
                handleSearch(searchTerm);
                if (searchTerm.length >= 3 && location.pathname !== '/shop') {
                    navigate('/shop');
                }
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm, handleSearch, navigate, location.pathname]);

    const activeFilter = !!selectedCategory;
    const isShopPage = location.pathname === '/shop';

    return (
        <header className="fixed top-0 z-[60] w-full h-20 border-b border-white/[0.03] bg-[#0c0c11]/80 shadow-2xl shadow-blue-500/5 backdrop-blur-2xl">
            <div className="layout-container h-full">
                <div className="flex h-full items-center justify-between gap-4">
                    <div className="flex items-center space-x-4 sm:space-x-8">
                        <Link
                            to="/"
                            className="bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-xl font-black tracking-tighter text-transparent drop-shadow-sm transition-transform duration-300 hover:scale-[1.02] sm:text-3xl"
                        >
                            ShopGrid
                        </Link>

                        {/* Navigation Links */}
                        <nav className="hidden items-center gap-1 sm:flex">
                            <Link
                                to="/"
                                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all ${location.pathname === '/' ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                            >
                                <HomeIcon className="h-4 w-4" />
                                Home
                            </Link>
                            <Link
                                to="/shop"
                                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all ${location.pathname === '/shop' ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                            >
                                <ShoppingBagIcon className="h-4 w-4" />
                                Shop
                            </Link>
                        </nav>
                    </div>

                    {/* Search Input */}
                    {isShopPage && (
                        <div className="relative flex max-w-md flex-1 items-center">
                            <div className="group relative w-full">
                                <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-blue-400 sm:left-4 sm:h-5 sm:w-5" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full rounded-xl border border-white/5 bg-white/5 py-2 pl-9 pr-8 text-xs font-medium text-white transition-all placeholder:text-gray-500 focus:border-blue-500/30 focus:bg-white/10 focus:outline-none focus:ring-4 focus:ring-blue-500/10 sm:rounded-2xl sm:py-2.5 sm:pl-12 sm:pr-10 sm:text-sm"
                                />
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm('')}
                                        className="absolute right-2 top-1/2 flex -translate-y-1/2 cursor-pointer items-center justify-center rounded-full p-1 text-gray-500 hover:bg-white/10 hover:text-white sm:right-3"
                                    >
                                        <XMarkIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    )}


                    <div className="flex items-center">
                        {isShopPage && (
                            <button
                                onClick={() => setIsFilterOpen(true)}
                                className={`relative flex cursor-pointer items-center justify-center rounded-full border border-white/5 p-2.5 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 ${activeFilter ? 'bg-blue-500/10 text-blue-400' : 'bg-white/5 text-white'
                                    }`}
                            >
                                <FunnelIcon className="h-5 w-5" />
                                {activeFilter && (
                                    <span className="absolute -top-1 -right-1 h-3 w-3 animate-pulse rounded-full bg-blue-500 shadow-lg shadow-blue-500/50"></span>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}


