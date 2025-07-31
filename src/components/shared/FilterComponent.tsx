// components/FilterComponent.tsx
import React from 'react';
import { Search, Filter } from 'lucide-react';
import ValidationInput from './ValidationInput';
import { FilterComponentProps } from '../../types';

const FilterComponent: React.FC<FilterComponentProps> = ({
                                                             onSearchChange,
                                                             onFilterToggle,
                                                             searchValue,
                                                             isFilterActive,
                                                             className = ''
                                                         }) => (
    <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
        <ValidationInput
            label=""
            value={searchValue}
            onChange={onSearchChange}
            placeholder="Search breeds..."
            icon={<Search size={20} />}
            className="flex-1"
        />
        <button
            onClick={onFilterToggle}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                isFilterActive
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
        >
            <Filter size={20} />
            <span>Hypoallergenic</span>
        </button>
    </div>
);

export default FilterComponent;