import {
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon
} from '@heroicons/react/24/outline';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];

        if (totalPages <= 3) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 2) {
                pages.push(1, 2, '...', totalPages);
            } else if (currentPage >= totalPages - 1) {
                pages.push(1, '...', totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', currentPage, '...', totalPages);
            }
        }
        return pages;
    };


    return (
        <div className="mt-16 flex flex-col items-center space-y-6">
            <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 sm:space-x-2">
                    {/* First Page */}
                    <button
                        onClick={() => onPageChange(1)}
                        disabled={currentPage === 1}
                        className="group flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl border border-white/5 bg-white/5 text-gray-400 transition-all duration-300 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-20"
                        title="First Page"
                    >
                        <ChevronDoubleLeftIcon className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
                    </button>

                    {/* Prev Page */}
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="group flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl border border-white/5 bg-white/5 text-gray-400 transition-all duration-300 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-20"
                        title="Previous Page"
                    >
                        <ChevronLeftIcon className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
                    </button>
                </div>

                <div className="flex items-center space-x-1 sm:space-x-2">
                    {getPageNumbers().map((page, index) => (
                        typeof page === 'number' ? (
                            <button
                                key={index}
                                onClick={() => onPageChange(page)}
                                className={`group relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl text-sm font-bold transition-all duration-500 ${currentPage === page
                                    ? 'bg-gradient-to-br from-blue-500 via-indigo-500 to-indigo-600 text-white shadow-xl shadow-blue-500/30 ring-2 ring-white/20'
                                    : 'border border-white/5 bg-white/2 text-gray-400 hover:border-white/20 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {page}
                                {currentPage === page && (
                                    <span className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-white shadow-lg shadow-white"></span>
                                )}
                            </button>
                        ) : (
                            <span key={index} className="flex h-11 w-8 items-center justify-center text-gray-600 font-bold">
                                {page}
                            </span>
                        )
                    ))}
                </div>

                <div className="flex items-center space-x-1 sm:space-x-2">
                    {/* Next Page */}
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="group flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl border border-white/5 bg-white/5 text-gray-400 transition-all duration-300 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-20"
                        title="Next Page"
                    >
                        <ChevronRightIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </button>

                    {/* Last Page */}
                    <button
                        onClick={() => onPageChange(totalPages)}
                        disabled={currentPage === totalPages}
                        className="group flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl border border-white/5 bg-white/5 text-gray-400 transition-all duration-300 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-20"
                        title="Last Page"
                    >
                        <ChevronDoubleRightIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </button>
                </div>
            </div>
        </div>
    );
}

