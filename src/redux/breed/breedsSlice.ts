// redux/breed/breedsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Breed, BreedsState, ApiResponse } from '../../types';

const initialState: BreedsState = {
    breeds: [],
    loading: false,
    error: null,
    isOnline: navigator.onLine,
    searchTerm: '',
    filterHypoallergenic: false,
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0,
    cachedBreeds: [],
};

const breedsSlice = createSlice({
    name: 'breeds',
    initialState,
    reducers: {
        fetchBreedsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchBreedsSuccess: (state, action: PayloadAction<ApiResponse>) => {
            state.loading = false;
            state.breeds = action.payload.data;
            state.error = null;
            state.currentPage = action.payload.meta.pagination.current;
            state.totalPages = action.payload.meta.pagination.last;
            state.totalRecords = action.payload.meta.pagination.records;

            // Cache breeds for offline use
            if (state.isOnline) {
                // Merge with existing cache, avoid duplicates
                const existingIds = state.cachedBreeds.map(breed => breed.id);
                const newBreeds = action.payload.data.filter(breed => !existingIds.includes(breed.id));
                state.cachedBreeds = [...state.cachedBreeds, ...newBreeds];
            }
        },
        fetchBreedsError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;

            // If offline, use cached data
            if (!state.isOnline && state.cachedBreeds.length > 0) {
                state.breeds = state.cachedBreeds.slice(0, 10); // Show first 10 from cache
                state.totalPages = Math.ceil(state.cachedBreeds.length / 10);
                state.totalRecords = state.cachedBreeds.length;
            }
        },
        setOnlineStatus: (state, action: PayloadAction<boolean>) => {
            state.isOnline = action.payload;
        },
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        },
        toggleHypoallergenicFilter: (state) => {
            state.filterHypoallergenic = !state.filterHypoallergenic;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        resetToFirstPage: (state) => {
            state.currentPage = 1;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
});

export const {
    fetchBreedsStart,
    fetchBreedsSuccess,
    fetchBreedsError,
    setOnlineStatus,
    setSearchTerm,
    toggleHypoallergenicFilter,
    setCurrentPage,
    resetToFirstPage,
    clearError,
} = breedsSlice.actions;

export default breedsSlice.reducer;