import { Box, Container, Pagination, Typography } from '@mui/material';
import React, { useState } from 'react';
import Error from '../components/Error';
import Loading from '../components/Loading';
import { baseUrlWbstool } from '../constants';
import { useFetchPaginatedData } from '../hooks/useFetchPaginatedData';

interface BasePaginatedListPageProps<T> {
    title: string;
    apiRoute: string;
    itemsName: string;
    action?: React.ReactNode;
    renderList: (items: T[], refreshData: () => void) => React.ReactNode;
}

function BasePaginatedListPage<T>({ title, apiRoute, itemsName, action, renderList }: BasePaginatedListPageProps<T>) {
    const routeKey = `page_${apiRoute.slice(1)}`;
    const [pageNumber, setPageNumber] = useState<number>(() => {
        const storedPage = localStorage.getItem(routeKey);
        return storedPage ? parseInt(storedPage, 10) : 1;
    });
    const [pageSize] = useState(15);
    const [refreshKey, setRefreshKey] = useState(0);
    const { data, loading, error }
        = useFetchPaginatedData<T>(`${baseUrlWbstool}${apiRoute}`, itemsName, pageNumber, pageSize, refreshKey);

    if (loading) { return <Loading />; }
    if (error) { return <Error error={error} />; }

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPageNumber(value);
        localStorage.setItem(routeKey, value.toString());
    };

    const totalPages = Math.ceil((data?.totalCount || 0) / pageSize);

    return (
        <Container sx={{ mb: 4 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2} mt={2}>
                <Typography variant="h4">
                    {title}
                </Typography>
                {action && <Box>{action}</Box>}
            </Box>

            {totalPages > 1 && (
                <Pagination
                    count={totalPages}
                    page={pageNumber}
                    onChange={handlePageChange}
                    color="primary"
                    sx={{ mt: 2 }}
                />
            )}

            {renderList(data?.items || [], () => setRefreshKey((prev) => prev + 1))}
        </Container>
    );
}

export default BasePaginatedListPage;
