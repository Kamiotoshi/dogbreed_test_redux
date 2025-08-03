// types/index.ts
export interface Breed {
    id: string;
    type: string;
    attributes: {
        name: string;
        description: string;
        life: {
            max: number;
            min: number;
        };
        male_weight: {
            max: number;
            min: number;
        };
        female_weight: {
            max: number;
            min: number;
        };
        hypoallergenic: boolean;
    };
}

// API Response interface
export interface ApiResponse {
    data: Breed[];
    meta: {
        pagination: {
            current: number;
            next: number | null;
            last: number;
            records: number;
        };
    };
    links: {
        self: string;
        current: string;
        next: string | null;
        last: string;
    };
}

export interface BreedsState {
    breeds: Breed[];
    loading: boolean;
    error: string | null;
    isOnline: boolean;
    searchTerm: string;
    filterHypoallergenic: boolean;
    // Pagination fields
    currentPage: number;
    totalPages: number;
    totalRecords: number;
    // Cache for offline
    cachedBreeds: Breed[];
}

export interface ValidationInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    validation?: (value: string) => string | null;
    placeholder?: string;
    type?: string;
    icon?: React.ReactNode;
    className?: string;
}

export interface LoadingSpinnerProps {
    size?: number;
    color?: string;
    className?: string;
}

export interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
    className?: string;
}

export interface ConnectionStatusProps {
    isOnline: boolean;
    className?: string;
}

export interface FilterComponentProps {
    onSearchChange: (value: string) => void;
    onFilterToggle: () => void;
    searchValue: string;
    isFilterActive: boolean;
    className?: string;
}

export interface BreedCardProps {
    breed: Breed;
    className?: string;
}

// New Pagination Props
export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalRecords: number;
    onPageChange: (page: number) => void;
    loading?: boolean;
    className?: string;
}