// services/api.ts
import { Breed } from '../types';

export const fetchBreedsFromAPI = async (): Promise<Breed[]> => {
    const response = await fetch('https://dogapi.dog/api/v2/breeds');

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data || [];
};