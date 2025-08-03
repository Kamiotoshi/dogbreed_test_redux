import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Breed, BreedsState, ApiResponse } from '../../types';

const ITEMS_PER_PAGE = 10; // Giả định số lượng bản ghi mỗi trang

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
            state.currentPage = action.payload.meta.pagination.current || 1;
            // Tính totalPages dựa trên records và ITEMS_PER_PAGE
            state.totalPages = action.payload.meta.pagination.records
                ? Math.ceil(action.payload.meta.pagination.records / ITEMS_PER_PAGE)
                : 1;
            state.totalRecords = action.payload.meta.pagination.records || 0;

            if (state.isOnline) {
                const existingIds = state.cachedBreeds.map(breed => breed.id);
                const newBreeds = action.payload.data.filter(breed => !existingIds.includes(breed.id));
                state.cachedBreeds = [...state.cachedBreeds, ...newBreeds];
            }
        },
        fetchBreedsError: (state, action: PayloadAction<string>) => {
            state.loading = false; // Đảm bảo loading được đặt về false khi lỗi
            state.error = action.payload;

            if (!state.isOnline && state.cachedBreeds.length > 0) {
                state.breeds = state.cachedBreeds.slice(0, ITEMS_PER_PAGE);
                state.totalPages = Math.ceil(state.cachedBreeds.length / ITEMS_PER_PAGE);
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