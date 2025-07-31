// store/breedsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Breed, BreedsState } from '../../types';

const initialState: BreedsState = {
    breeds: [],
    loading: false,
    error: null,
    isOnline: navigator.onLine,
    searchTerm: '',
    filterHypoallergenic: false,
};

const breedsSlice = createSlice({
    name: 'breeds',
    initialState,
    reducers: {
        fetchBreedsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchBreedsSuccess: (state, action: PayloadAction<Breed[]>) => {
            state.loading = false;
            state.breeds = action.payload;
            state.error = null;
        },
        fetchBreedsError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
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
    },
});

export const {
    fetchBreedsStart,
    fetchBreedsSuccess,
    fetchBreedsError,
    setOnlineStatus,
    setSearchTerm,
    toggleHypoallergenicFilter
} = breedsSlice.actions;

export default breedsSlice.reducer;