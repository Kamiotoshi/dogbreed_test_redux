// components/DogBreedsApp.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { Dog, Wifi, WifiOff, AlertTriangle } from 'lucide-react';
import { AppDispatch } from '../../redux/store';
import { setSearchTerm, toggleHypoallergenicFilter, setCurrentPage } from '../../redux/breed/breedsSlice';
import { useBreeds } from '../../hooks/useBreeds';
import LoadingSpinner from "../shared/LoadingSpinner";
import ErrorMessage from "../shared/ErrorMessage";
import ConnectionStatus from "../shared/ConnectionStatus";
import FilterComponent from "../shared/FilterComponent";
import BreedCard from '../shared/BreedCard';
import Pagination from '../shared/Pagination';

const DogBreedsApp: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        breeds,
        loading,
        error,
        isOnline,
        searchTerm,
        filterHypoallergenic,
        currentPage,
        totalPages,
        totalRecords,
        cachedBreeds,
        fetchBreeds,
        debouncedSearchTerm,
        isSearching
    } = useBreeds();

    // Filter breeds based on hypoallergenic filter (search is handled by API)
    const filteredBreeds = breeds.filter((breed) => {
        const matchesFilter = !filterHypoallergenic || breed.attributes.hypoallergenic;
        return matchesFilter;
    });

    const handlePageChange = async (page: number) => {
        dispatch(setCurrentPage(page));

        const result = await fetchBreeds(page, debouncedSearchTerm);

        // Nếu API trả về rỗng → giảm trang về gần nhất có dữ liệu
        if (result?.data.length === 0 && page > 1) {
            const fallbackPage = page - 1;
            dispatch(setCurrentPage(fallbackPage));
            await fetchBreeds(fallbackPage, debouncedSearchTerm);
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    const handleRetry = () => {
        fetchBreeds(currentPage, debouncedSearchTerm);
    };

    // Show offline notice
    const showOfflineNotice = !isOnline && cachedBreeds.length > 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center space-x-2">
                            <Dog size={32} className="text-blue-500" />
                            <span>Dog Breeds Directory</span>
                        </h1>
                        <ConnectionStatus isOnline={isOnline} />
                    </div>
                </div>
            </header>

            {/* Offline Banner */}
            {showOfflineNotice && (
                <div className="bg-orange-500 text-white px-4 py-3">
                    <div className="max-w-7xl mx-auto flex items-center space-x-2">
                        <WifiOff size={20} />
                        <span className="font-medium">
                            You're offline. Showing cached data ({cachedBreeds.length} breeds available).
                        </span>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Filters */}
                <div className="mb-8">
                    <FilterComponent
                        onSearchChange={(value) => dispatch(setSearchTerm(value))}
                        onFilterToggle={() => dispatch(toggleHypoallergenicFilter())}
                        searchValue={searchTerm}
                        isFilterActive={filterHypoallergenic}
                        isSearching={isSearching}
                        searchTerm={searchTerm}
                        debouncedSearchTerm={debouncedSearchTerm}
                    />
                </div>

                {/* Content */}
                {loading && (
                    <div className="text-center py-12">
                        <LoadingSpinner size={48} className="mb-4" />
                        <p className="text-gray-600">Loading dog breeds...</p>
                        {isSearching && (
                            <p className="text-blue-600 text-sm mt-2">
                                Searching for "{searchTerm}"...
                            </p>
                        )}
                    </div>
                )}

                {error && !showOfflineNotice && (
                    <ErrorMessage
                        message={error}
                        onRetry={handleRetry}
                        className="mb-8"
                    />
                )}

                {/* No Results */}
                {!loading && !error && filteredBreeds.length === 0 && breeds.length > 0 && (
                    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                        <Dog size={48} className="text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">No breeds found</h3>
                        <p className="text-gray-600">
                            {filterHypoallergenic
                                ? "No hypoallergenic breeds match your search criteria."
                                : "Try adjusting your search terms."
                            }
                        </p>
                    </div>
                )}

                {!loading && !error && filteredBreeds.length === 0 && breeds.length === 0 && !showOfflineNotice && (
                    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                        <AlertTriangle size={48} className="text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">No breeds available</h3>
                        <p className="text-gray-600">Unable to load breed data. Please try again.</p>
                    </div>
                )}

                {/* Breeds Grid */}
                {filteredBreeds.length > 0 && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {filteredBreeds.map((breed) => (
                                <BreedCard key={breed.id} breed={breed} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {!showOfflineNotice && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                totalRecords={totalRecords}
                                onPageChange={handlePageChange}
                                loading={loading}
                            />
                        )}

                        {/* Results Summary */}
                        <div className="mt-4 text-center text-gray-600">
                            {showOfflineNotice ? (
                                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                                    <div className="flex items-center justify-center space-x-2 text-orange-700">
                                        <WifiOff size={16} />
                                        <span>
                                            Offline mode: Showing {filteredBreeds.length} of {cachedBreeds.length} cached breeds
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                    <span className="text-blue-700">
                                        Showing {filteredBreeds.length} breeds on page {currentPage} of {totalPages}
                                        {searchTerm && ` for "${searchTerm}"`}
                                        {filterHypoallergenic && " (hypoallergenic only)"}
                                    </span>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="text-center text-gray-600">
                        <p>
                            Data provided by{' '}
                            <a
                                href="https://dogapi.dog"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 underline"
                            >
                                Dog API
                            </a>
                        </p>
                        <p className="mt-2 text-sm">
                            Total breeds in database: {totalRecords.toLocaleString()}
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default DogBreedsApp;