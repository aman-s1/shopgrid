import { FunnelIcon } from '@heroicons/react/24/outline';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0f0f13]/80 shadow-sm shadow-blue-500/5 backdrop-blur-xl">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-6 py-5 transition-all sm:px-8">
        <h1 className="cursor-pointer bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-2xl font-black tracking-tighter text-transparent drop-shadow-sm transition-transform duration-300 hover:scale-[1.02] sm:text-3xl">
          ShopGrid
        </h1>
        <nav className="hidden gap-8 text-sm font-semibold text-gray-400 md:flex lg:gap-12">
          <a
            href="#"
            className="rounded-full px-4 py-2 transition-all duration-300 hover:bg-white/5 hover:text-white"
          >
            Home
          </a>
          <a
            href="#"
            className="rounded-full px-4 py-2 transition-all duration-300 hover:bg-white/5 hover:text-white"
          >
            Categories
          </a>
          <a
            href="#"
            className="rounded-full px-4 py-2 transition-all duration-300 hover:bg-white/5 hover:text-white"
          >
            Deals
          </a>
        </nav>
        <div className="flex items-center space-x-4">
          <button className="hidden cursor-pointer items-center justify-center rounded-full border border-white/5 bg-white/5 p-2.5 text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 sm:flex">
            <FunnelIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
