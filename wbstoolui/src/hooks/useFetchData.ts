import { useState, useEffect } from 'react';
import axios from 'axios';

function getAuthHeaders(): { Authorization: string } {
    return { Authorization: `Bearer ${localStorage.getItem('jwt')}` };
}

export function useFetchList<T>(
    url: string,
    refreshkey: number
)
{
    const [data, setData] = useState<T[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const apiUrl = `${url}`;

        setLoading(true);
        setError(null);

        axios
            .get(apiUrl, { headers: getAuthHeaders() })
            .then((response) => {
                setData(response.data as T[]);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [url, refreshkey]);

    return { data, loading, error };
}
