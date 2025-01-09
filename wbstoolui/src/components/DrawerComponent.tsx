import ChevronLeftIcon from '@mui/icons-material/ChevronLeftOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import ListIcon from '@mui/icons-material/ListOutlined';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { colourGrey, drawerWidth } from '../constants';

interface DrawerComponentProps {
    drawerOpen: boolean;
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DrawerComponent: React.FC<DrawerComponentProps> = ({ drawerOpen, setDrawerOpen }) => {
    const menuItems = [
        { label: 'Task List', path: '/tasklist' },
    ];

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer
                sx={{
                    width: drawerOpen ? drawerWidth : 0,
                    flexShrink: 0,
                    transition: 'width 0.3s ease',
                    '& .MuiDrawer-paper': {
                        width: drawerOpen ? drawerWidth : 0,
                        boxSizing: 'border-box',
                        transition: 'width 0.3s ease',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={drawerOpen}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', p: '12px' }}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Box>
                <Divider />
                <List>
                    {menuItems.map((item) => (
                        <ListItem key={item.label} component={NavLink} to={item.path}>
                            <ListItemText
                                sx={{ color: colourGrey }}
                                primary={item.label}
                            />
                        </ListItem>
                    ))}
                    <ListItem key='PersonsRoles' component={NavLink} to='/persons'>
                        <Box sx={{ display: 'flex', alignItems: 'center', color: colourGrey }}>
                            <GroupOutlinedIcon sx={{ mr: 1, color: 'inherit' }} />
                            <ListItemText
                                sx={{ color: 'inherit' }}
                                primary='Persons & Roles'
                            />
                        </Box>
                    </ListItem>
                    <ListItem key='ProjectSettings' component={NavLink} to='/project'>
                        <Box sx={{ display: 'flex', alignItems: 'center', color: colourGrey }}>
                            <SettingsIcon sx={{ mr: 1, color: 'inherit' }} />
                            <ListItemText
                                sx={{ color: 'inherit' }}
                                primary='Settings'
                            />
                        </Box>
                    </ListItem>
                    <Divider sx={{ mt: 1, mb: 1 }} />
                    <ListItem key='MyProjects' component={NavLink} to='/projects'>
                        <Box sx={{ display: 'flex', alignItems: 'center', color: colourGrey }}>
                            <ListIcon sx={{ mr: 1, color: 'inherit' }} />
                            <ListItemText
                                sx={{ color: 'inherit' }}
                                primary='My Projects'
                            />
                        </Box>
                    </ListItem>
                </List>
            </Drawer>
        </Box>
    );
};

export default DrawerComponent;
