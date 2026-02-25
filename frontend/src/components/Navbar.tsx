import { FunnelIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

interface NavbarProps {
    onOpenFilter: () => void;
    activeFilter?: boolean;
    onSearch: (query: string) => void;
    onReset?: () => void;
    initialSearch?: string;
}

export function Navbar({ onOpenFilter, activeFilter, onSearch, onReset, initialSearch = '' }: NavbarProps) {

    const [searchTerm, setSearchTerm] = useState(initialSearch);

    useEffect(() => {
        setSearchTerm(initialSearch);
    }, [initialSearch]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm.length === 0 || searchTerm.length >= 3) {
                onSearch(searchTerm);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm, onSearch]);


    return (
        <header className="sticky top-0 z-50 h-20 border-b border-white/[0.03] bg-[#0c0c11]/80 shadow-2xl shadow-blue-500/5 backdrop-blur-2xl">
            <div className="layout-container h-full">
                <div className="flex h-full items-center justify-between">
                    <div className="flex flex-1 items-center space-x-4 sm:space-x-8">
                        <h1
                            onClick={onReset}
                            className="cursor-pointer bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-xl font-black tracking-tighter text-transparent drop-shadow-sm transition-transform duration-300 hover:scale-[1.02] sm:text-3xl"
                        >
                            ShopGrid
                        </h1>

                        {/* Search Input */}
                        <div className="relative flex max-w-md flex-1 items-center">
                            <div className="group relative w-full">
                                <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-blue-400 sm:left-4 sm:h-5 sm:w-5" />
                                <input
                                    type="text"
                                    placeholder="Search..."
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
                    </div>

                    <div className="flex items-center">

                        <button
                            onClick={onOpenFilter}
                            className={`relative mr-6 flex cursor-pointer items-center justify-center rounded-full border border-white/5 p-2.5 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 ${activeFilter ? 'bg-blue-500/10 text-blue-400' : 'bg-white/5 text-white'
                                }`}
                        >
                            <FunnelIcon className="h-5 w-5" />
                            {activeFilter && (
                                <span className="absolute -top-1 -right-1 h-3 w-3 animate-pulse rounded-full bg-blue-500 shadow-lg shadow-blue-500/50"></span>
                            )}
                        </button>
                    </div>


                </div>
            </div>
        </header>
    );
}
