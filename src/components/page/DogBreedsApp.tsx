// components/DogBreedsApp.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { Dog } from 'lucide-react';
import { AppDispatch } from '../../redux/store';
import { setSearchTerm, toggleHypoallergenicFilter } from '../../redux/breed/breedsSlice';
import { useBreeds } from '../../hooks/useBreeds';
import LoadingSpinner from "../shared/LoadingSpinner";
import ErrorMessage from "../shared/ErrorMessage";
import ConnectionStatus from "../shared/ConnectionStatus";
import FilterComponent from "../shared/FilterComponent";
import BreedCard from '../shared/BreedCard';

const DogBreedsApp: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        breeds,
        loading,
        error,
        isOnline,
        searchTerm,
        filterHypoallergenic,
        fetchBreeds
    } = useBreeds();

    // Filter breeds based on search and filter
    const filteredBreeds = breeds.filter((breed) => {
        const matchesSearch = breed.attributes.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesFilter = !filterHypoallergenic || breed.attributes.hypoallergenic;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
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

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Filters */}
                <div className="mb-8">
                    <FilterComponent
                        onSearchChange={(value) => dispatch(setSearchTerm(value))}
                        onFilterToggle={() => dispatch(toggleHypoallergenicFilter())}
                        searchValue={searchTerm}
                        isFilterActive={filterHypoallergenic}
                    />
                </div>

                {/* Content */}
                {loading && (
                    <div className="text-center py-12">
                        <LoadingSpinner size={48} className="mb-4" />
                        <p className="text-gray-600">Loading dog breeds...</p>
                    </div>
                )}

                {error && (
                    <ErrorMessage
                        message={error}
                        onRetry={fetchBreeds}
                        className="mb-8"
                    />
                )}

                {!loading && !error && filteredBreeds.length === 0 && breeds.length > 0 && (
                    <div className="text-center py-12">
                        <Dog size={48} className="text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No breeds match your search criteria.</p>
                    </div>
                )}

                {!loading && !error && filteredBreeds.length === 0 && breeds.length === 0 && (
                    <div className="text-center py-12">
                        <Dog size={48} className="text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No breeds available.</p>
                    </div>
                )}

                {/* Breeds Grid */}
                {filteredBreeds.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredBreeds.map((breed) => (
                            <BreedCard key={breed.id} breed={breed} />
                        ))}
                    </div>
                )}

                {/* Results Summary */}
                {!loading && breeds.length > 0 && (
                    <div className="mt-8 text-center text-gray-600">
                        Showing {filteredBreeds.length} of {breeds.length} breeds
                    </div>
                )}
            </main>
        </div>
    );
};

export default DogBreedsApp;