import { useState, useEffect } from 'react';
import axios from 'axios';
import { PaginatedResponseDto } from '../dtos/PaginatedResponseDto';
import { useServices } from './useServices';

export function useFetchPaginatedData<T>(
    url: string,
    itemsName: string,
    page: number,
    pageSize: number,
    refreshkey: number
)
{
    const { authApiService } = useServices();
    const [data, setData] = useState<PaginatedResponseDto<T> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        const apiUrl = `${url}?pageNumber=${page}&pageSize=${pageSize}`;
        const headers = authApiService.getAuthHeaders();

        axios
            .get(apiUrl, { headers: headers })
            .then((response) => {
                const instance = new PaginatedResponseDto<T>(response.data, itemsName);
                setData(instance);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [authApiService, url, itemsName, page, pageSize, refreshkey]);

    return { data, loading, error };
}
