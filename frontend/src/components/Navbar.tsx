import { FunnelIcon } from '@heroicons/react/24/outline';

interface NavbarProps {
    onOpenFilter: () => void;
    activeFilter?: boolean;
}

export function Navbar({ onOpenFilter, activeFilter }: NavbarProps) {
    return (
        <header className="sticky top-0 z-50 h-20 border-b border-white/[0.03] bg-[#0c0c11]/80 shadow-2xl shadow-blue-500/5 backdrop-blur-2xl">
            <div className="layout-container h-full">
                <div className="flex h-full items-center justify-between">
                    <h1 className="pl-6 cursor-pointer bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-2xl font-black tracking-tighter text-transparent drop-shadow-sm transition-transform duration-300 hover:scale-[1.02] sm:text-3xl">
                        ShopGrid
                    </h1>

                    <div className="flex items-center space-x-4">
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
