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
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages + 2) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);

            if (currentPage > 3) {
                pages.push('...');
            }

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                if (!pages.includes(i)) pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push('...');
            }

            if (!pages.includes(totalPages)) pages.push(totalPages);
        }
        return pages;
    };

    return (
        <div className="mt-16 flex items-center justify-center space-x-2">
            <div className="flex items-center space-x-1 sm:space-x-2">
                {/* First Page */}
                <button
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/5 bg-white/5 text-gray-400 transition-all duration-300 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-20"
                    title="First Page"
                >
                    <ChevronDoubleLeftIcon className="h-4 w-4" />
                </button>

                {/* Prev Page */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/5 bg-white/5 text-gray-400 transition-all duration-300 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-20"
                    title="Previous Page"
                >
                    <ChevronLeftIcon className="h-4 w-4" />
                </button>
            </div>

            <div className="flex items-center space-x-1 sm:space-x-2">
                {getPageNumbers().map((page, index) => (
                    typeof page === 'number' ? (
                        <button
                            key={index}
                            onClick={() => onPageChange(page)}
                            className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-sm font-medium transition-all duration-300 ${currentPage === page
                                    ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20 ring-1 ring-white/10'
                                    : 'border border-white/5 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            {page}
                        </button>
                    ) : (
                        <span key={index} className="flex h-10 w-8 items-center justify-center text-gray-500">
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
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/5 bg-white/5 text-gray-400 transition-all duration-300 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-20"
                    title="Next Page"
                >
                    <ChevronRightIcon className="h-4 w-4" />
                </button>

                {/* Last Page */}
                <button
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/5 bg-white/5 text-gray-400 transition-all duration-300 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-20"
                    title="Last Page"
                >
                    <ChevronDoubleRightIcon className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
