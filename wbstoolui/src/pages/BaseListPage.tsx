import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Container, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Error from '../components/Error';
import Loading from '../components/Loading';
import { baseUrlWbstool } from '../constants';
import { useFetchList } from '../hooks/useFetchData';

interface BaseListPageProps<T> {
    title: string;
    apiRoute: string;
    renderList: (items: T[], refreshData: () => void) => React.ReactNode;
}

function BaseListPage<T>({ title, apiRoute, renderList } : BaseListPageProps<T>) {
    const navigate = useNavigate();
    const [refreshKey, setRefreshKey] = useState(0);
    const { data, loading, error }
        = useFetchList<T>(`${baseUrlWbstool}${apiRoute}`, refreshKey);

    if (loading) { return <Loading />; }
    if (error) { return <Error error={error} />; }

    return (
        <Container sx={{ mb: 4 }}>
            <Box display="flex" alignItems="center" mb={2} mt={2}>
                <IconButton onClick={() => navigate('/')} color="primary" style={{ marginRight: '16px' }}>
                    <ArrowBackIcon fontSize="large" />
                </IconButton>
                <Typography variant="h2">
                    {title}
                </Typography>
            </Box>
            {renderList(data || [], () => setRefreshKey((prev) => prev + 1))}
        </Container>
    );
}

export default BaseListPage;
