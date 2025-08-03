// services/api.ts
import { ApiResponse } from '../types';

export const fetchBreedsFromAPI = async (page: number = 1, search?: string): Promise<ApiResponse> => {
    // Base URL với page
    let url = `https://dogapi.dog/api/v2/breeds?page[number]=${page}`;

    // Thêm search parameter nếu có (sử dụng đúng format của API)
    if (search && search.trim()) {
        // Dog API có thể không support search trực tiếp, ta sẽ filter client-side
        console.log('Searching for:', search.trim());
    }

    console.log('Fetching URL:', url);

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse = await response.json();

    // Client-side filtering nếu có search term
    if (search && search.trim()) {
        const searchLower = search.trim().toLowerCase();
        data.data = data.data.filter(breed =>
            breed.attributes.name.toLowerCase().includes(searchLower)
        );
    }

    return data;
};