import { useState, useEffect } from 'react';
import axios from 'axios';
import { PaginatedResponseDto } from '../dtos/PaginatedResponseDto';

function getAuthHeaders(): { Authorization: string } {
    return { Authorization: `Bearer ${localStorage.getItem('jwt')}` };
}

export function useFetchPaginatedData<T>(
    url: string,
    itemsName: string,
    page: number,
    pageSize: number
)
{
    const [data, setData] = useState<PaginatedResponseDto<T> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const apiUrl = `${url}?pageNumber=${page}&pageSize=${pageSize}`;

        setLoading(true);
        setError(null);

        axios
            .get(apiUrl, { headers: getAuthHeaders() })
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
    }, [url, itemsName, page, pageSize]);

    return { data, loading, error };
}
