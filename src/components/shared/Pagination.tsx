// components/Pagination.tsx
import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { PaginationProps } from '../../types';

const Pagination: React.FC<PaginationProps> = ({
                                                   currentPage,
                                                   totalPages,
                                                   totalRecords,
                                                   onPageChange,
                                                   loading = false,
                                                   className = ''
                                               }) => {
    if (totalPages <= 1) return null;

    const generatePageNumbers = () => {
        const pages: (number | 'ellipsis')[] = [];
        const delta = 1; // Giảm xuống 1 để tiết kiệm không gian trên mobile

        if (totalPages <= 5) {
            // Show all pages if total is small (giảm từ 7 xuống 5)
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            if (currentPage > delta + 2) {
                pages.push('ellipsis');
            }

            // Show pages around current page
            const start = Math.max(2, currentPage - delta);
            const end = Math.min(totalPages - 1, currentPage + delta);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - delta - 1) {
                pages.push('ellipsis');
            }

            // Always show last page (chỉ khi totalPages > 1)
            pages.push(totalPages);
        }

        // Remove duplicates (fix vấn đề hiển thị trùng số trang)
        const uniquePages = pages.filter((page, index, array) => {
            if (page === 'ellipsis') return true;
            return array.indexOf(page) === index;
        });

        return uniquePages;
    };

    const handlePageClick = (page: number) => {
        if (page !== currentPage && page >= 1 && page <= totalPages && !loading) {
            // Scroll to top when changing page
            window.scrollTo({ top: 0, behavior: 'smooth' });
            onPageChange(page);
        }
    };

    // Fix logic for previous/next buttons
    const canGoPrevious = currentPage > 1 && !loading;
    const canGoNext = currentPage < totalPages && !loading;

    return (
        <div className={`bg-white rounded-lg shadow-md p-3 sm:p-6 ${className}`}>
            {/* Results Info */}
            <div className="text-center mb-3 sm:mb-4">
                <p className="text-xs sm:text-sm text-gray-600">
                    Page <span className="font-semibold text-blue-600">{currentPage}</span> of{' '}
                    <span className="font-semibold">{totalPages}</span>
                    <span className="hidden sm:inline">
                        {' '}({totalRecords.toLocaleString()} total breeds)
                    </span>
                </p>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-center space-x-1 overflow-x-auto pb-2">
                {/* Previous Button */}
                <button
                    onClick={() => {
                        if (canGoPrevious) {
                            handlePageClick(currentPage - 1);
                        }
                    }}
                    disabled={!canGoPrevious}
                    className={`flex items-center space-x-1 px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                        canGoPrevious
                            ? 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-900 cursor-pointer'
                            : 'text-gray-400 bg-gray-100 border border-gray-200 cursor-not-allowed'
                    }`}
                >
                    <ChevronLeft size={14} className="sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Previous</span>
                </button>

                {/* Page Numbers */}
                <div className="flex space-x-1 min-w-0">
                    {generatePageNumbers().map((page, index) => {
                        if (page === 'ellipsis') {
                            return (
                                <div
                                    key={`ellipsis-${index}`}
                                    className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-gray-500"
                                >
                                    <MoreHorizontal size={14} className="sm:w-4 sm:h-4" />
                                </div>
                            );
                        }

                        const isActive = page === currentPage;
                        return (
                            <button
                                key={page}
                                onClick={() => {
                                    if (!loading && page !== currentPage) {
                                        handlePageClick(page);
                                    }
                                }}
                                disabled={loading || page === currentPage}
                                className={`w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 flex-shrink-0 ${
                                    isActive
                                        ? 'bg-blue-600 text-white shadow-md cursor-default'
                                        : loading
                                            ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                                            : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-blue-600 cursor-pointer'
                                }`}
                            >
                                {page}
                            </button>
                        );
                    })}
                </div>

                {/* Next Button */}
                <button
                    onClick={() => {
                        if (canGoNext) {
                            handlePageClick(currentPage + 1);
                        }
                    }}
                    disabled={!canGoNext}
                    className={`flex items-center space-x-1 px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                        canGoNext
                            ? 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-900 cursor-pointer'
                            : 'text-gray-400 bg-gray-100 border border-gray-200 cursor-not-allowed'
                    }`}
                >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight size={14} className="sm:w-4 sm:h-4" />
                </button>
            </div>

            {/* Quick Jump Buttons - Chỉ hiển thị trên desktop */}
            {totalPages > 10 && (
                <div className="hidden sm:flex justify-center space-x-2 mt-4">
                    <button
                        onClick={() => {
                            if (currentPage !== 1 && !loading) {
                                handlePageClick(1);
                            }
                        }}
                        disabled={currentPage === 1 || loading}
                        className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                            currentPage === 1 || loading
                                ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                                : 'text-blue-600 bg-blue-50 hover:bg-blue-100 cursor-pointer'
                        }`}
                    >
                        First
                    </button>
                    <button
                        onClick={() => {
                            if (currentPage !== totalPages && !loading) {
                                handlePageClick(totalPages);
                            }
                        }}
                        disabled={currentPage === totalPages || loading}
                        className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                            currentPage === totalPages || loading
                                ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                                : 'text-blue-600 bg-blue-50 hover:bg-blue-100 cursor-pointer'
                        }`}
                    >
                        Last
                    </button>
                </div>
            )}

            {/* Mobile Quick Jump - Chỉ hiển thị trên mobile */}
            <div className="flex sm:hidden justify-center space-x-2 mt-3 text-xs">
                <span className="text-gray-500">
                    Jump to:
                </span>
                <button
                    onClick={() => {
                        if (currentPage !== 1 && !loading) {
                            handlePageClick(1);
                        }
                    }}
                    disabled={currentPage === 1 || loading}
                    className={`px-2 py-1 font-medium rounded ${
                        currentPage === 1 || loading
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-blue-600 hover:underline cursor-pointer'
                    }`}
                >
                    First
                </button>
                <span className="text-gray-300">|</span>
                <button
                    onClick={() => {
                        if (currentPage !== totalPages && !loading) {
                            handlePageClick(totalPages);
                        }
                    }}
                    disabled={currentPage === totalPages || loading}
                    className={`px-2 py-1 font-medium rounded ${
                        currentPage === totalPages || loading
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-blue-600 hover:underline cursor-pointer'
                    }`}
                >
                    Last
                </button>
            </div>

            {/* Loading Indicator */}
            {loading && (
                <div className="flex justify-center mt-3 sm:mt-4">
                    <div className="flex items-center space-x-2 text-blue-600">
                        <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                        <span className="text-xs sm:text-sm">Loading...</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Pagination;