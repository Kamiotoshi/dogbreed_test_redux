// hooks/useBreeds.ts
import { useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import {
    fetchBreedsStart,
    fetchBreedsSuccess,
    fetchBreedsError,
    setOnlineStatus,
    resetToFirstPage
} from '../redux/breed/breedsSlice';
import { fetchBreedsFromAPI } from '../services/api';
import { useDebounce } from './useDebounce';


export const useBreeds = () => {
    const dispatch = useDispatch<AppDispatch>();
    const breedsState = useSelector((state: RootState) => state.breeds);

    // Debounce search term with 3 second delay
    const debouncedSearchTerm = useDebounce(breedsState.searchTerm, 1000);

    // Fetch breeds function
    const fetchBreeds = async (page: number = 1, search?: string) => {
        dispatch(fetchBreedsStart());
        try {
            const response = await fetchBreedsFromAPI(page, search);
            dispatch(fetchBreedsSuccess(response));
            return response; // ADD THIS
        } catch (err) {
            const errorMessage = breedsState.isOnline
                ? 'Failed to fetch breeds. Please check your internet connection.'
                : 'You are offline. Please connect to the internet to load breeds.';
            dispatch(fetchBreedsError(errorMessage));
        }
    };

    // Monitor online/offline status
    useEffect(() => {
        const handleOnline = () => dispatch(setOnlineStatus(true));
        const handleOffline = () => dispatch(setOnlineStatus(false));

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [dispatch]);

    // Effect for debounced search
    useEffect(() => {
        if (debouncedSearchTerm !== breedsState.searchTerm) {
            return; // Don't trigger if values are different (still debouncing)
        }

        // Reset to page 1 when search changes
        dispatch(resetToFirstPage());
        fetchBreeds(1, debouncedSearchTerm);
    }, [debouncedSearchTerm]);

    // Initial fetch
    useEffect(() => {
        fetchBreeds(1);
    }, []);

    return {
        ...breedsState,
        fetchBreeds,
        debouncedSearchTerm,
        isSearching: breedsState.searchTerm !== debouncedSearchTerm,
    };
};