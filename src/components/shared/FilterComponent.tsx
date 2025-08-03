// components/FilterComponent.tsx
import React from 'react';
import { Search, Filter, Clock } from 'lucide-react';
import ValidationInput from './ValidationInput';
import { FilterComponentProps } from '../../types';

interface ExtendedFilterComponentProps extends FilterComponentProps {
    isSearching?: boolean;
    searchTerm?: string;
    debouncedSearchTerm?: string;
}

const FilterComponent: React.FC<ExtendedFilterComponentProps> = ({
                                                                     onSearchChange,
                                                                     onFilterToggle,
                                                                     searchValue,
                                                                     isFilterActive,
                                                                     className = '',
                                                                     isSearching = false,
                                                                     searchTerm = '',
                                                                     debouncedSearchTerm = ''
                                                                 }) => {
    const showSearchingIndicator = isSearching && searchTerm !== debouncedSearchTerm;

    return (
        <div className={`space-y-4 ${className}`}>
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                    <ValidationInput
                        label=""
                        value={searchValue}
                        onChange={onSearchChange}
                        placeholder="Search breeds..."
                        icon={<Search size={20} />}
                        className="w-full"
                    />
                    {showSearchingIndicator && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2 text-blue-500">
                            <Clock size={16} className="animate-pulse" />
                            <span className="text-sm">Searching...</span>
                        </div>
                    )}
                </div>

                <button
                    onClick={onFilterToggle}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 transform hover:scale-105 ${
                        isFilterActive
                            ? 'bg-blue-500 text-white border-blue-500 shadow-md'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                    }`}
                >
                    <Filter size={20} />
                    <span className="font-medium cursor-pointer">Hypoallergenic</span>
                </button>
            </div>

            {/* Search Status Indicator */}
            {showSearchingIndicator && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2 text-blue-700">
                        <Clock size={16} />
                        <span className="text-sm">
                            Will search for "<strong>{searchTerm}</strong>" in a few seconds...
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterComponent;