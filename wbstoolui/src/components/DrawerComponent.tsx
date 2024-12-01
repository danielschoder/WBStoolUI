import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';

const DrawerComponent: React.FC<{
    drawerOpen: boolean;
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleLogout: () => void;
}> = ({ drawerOpen, setDrawerOpen, handleLogout }) => {
    const menuItems = [
        { label: 'Home', path: '/' },
        { label: 'My Projects', path: '/projects' }
    ];

    return (
        <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.label} component={NavLink} to={item.path} onClick={() => setDrawerOpen(false)}>
                        <ListItemText primary={item.label} />
                    </ListItem>
                ))}
                <ListItem key="Logout" component="div" onClick={() => {
                        handleLogout();
                        setDrawerOpen(false);
                    }}>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default DrawerComponent;
