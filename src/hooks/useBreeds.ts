// hooks/useBreeds.ts
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import {
    fetchBreedsStart,
    fetchBreedsSuccess,
    fetchBreedsError,
    setOnlineStatus
} from '../redux/breed/breedsSlice';
import { fetchBreedsFromAPI } from '../services/api';

export const useBreeds = () => {
    const dispatch = useDispatch<AppDispatch>();
    const breedsState = useSelector((state: RootState) => state.breeds);

    // Fetch breeds function
    const fetchBreeds = async () => {
        dispatch(fetchBreedsStart());
        try {
            const breeds = await fetchBreedsFromAPI();
            dispatch(fetchBreedsSuccess(breeds));
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

    // Initial fetch
    useEffect(() => {
        fetchBreeds();
    }, []);

    return {
        ...breedsState,
        fetchBreeds,
    };
};