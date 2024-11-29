import { Box, List, ListItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DriverDto } from '../dtos/DriverDto';
import BaseListPage from './BaseListPage';

function Drivers() {
    const navigate = useNavigate();

    return (
        <BaseListPage<DriverDto>
            title="Drivers"
            route="/api/drivers"
            itemsName="drivers"
            renderList={(drivers) => (
                <List>
                    <ListItem sx={{ backgroundColor: "#e0e0e0", mb: 1, borderRadius: 1 }}>
                        <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" px={2}>
                            <Box flex={1}>
                                <Typography variant="h6" color="text.primary" fontWeight="bold">
                                    Name
                                </Typography>
                            </Box>
                        {/*    <Box flex={1}>*/}
                        {/*        <Typography variant="h6" color="text.primary" fontWeight="bold">*/}
                        {/*            Wikipedia*/}
                        {/*        </Typography>*/}
                        {/*    </Box>*/}
                        </Box>
                    </ListItem>
                    {drivers?.map((driver) => (
                        <ListItem
                            key={driver.id}
                            sx={{ backgroundColor: "#f5f5f5", mb: 1, borderRadius: 1, cursor: 'pointer' }}
                            onClick={() => navigate(`/drivers/${driver.id}`)}
                        >
                            <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" px={2}>
                                <Box flex={1}>
                                    <Typography variant="body1" color="text.secondary" fontWeight="bold">
                                        {driver.name}
                                    </Typography>
                                </Box>
                            {/*    <Box flex={1}>*/}
                            {/*        <Button*/}
                            {/*            variant="outlined"*/}
                            {/*            href={driver.wikipediaUrl}*/}
                            {/*            target="_blank"*/}
                            {/*            rel="noopener noreferrer"*/}
                            {/*            style={{ textTransform: 'lowercase' }}*/}
                            {/*        >*/}
                            {/*            Wikipedia*/}
                            {/*        </Button>*/}
                            {/*    </Box>*/}
                            </Box>
                        </ListItem>
                    ))}
                </List>
            )}
        />
    );
}

export default Drivers;
