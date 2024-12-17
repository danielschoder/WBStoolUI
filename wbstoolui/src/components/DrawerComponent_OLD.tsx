import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
//import { useCurrentProject } from '../hooks/useCurrentProject';

const DrawerComponent_OLD: React.FC<{
    drawerOpen: boolean;
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ drawerOpen, setDrawerOpen }) => {
    //const { project } = useCurrentProject();
    const menuItems = [
        { label: 'Task List', path: '/tasklist' },
        { label: 'Persons & Roles', path: '/persons' },
        { label: 'My Projects', path: '/projects' }
    ];

    return (
        <Drawer
            anchor="left"
            variant="persistent"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                },
            }}
        >
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.label} component={NavLink} to={item.path}>
                        <ListItemText primary={item.label} />
                    </ListItem>
                ))}
            {/*    <ListItem key="Logout" component="div" onClick={() => {*/}
            {/*            handleLogout();*/}
            {/*            setDrawerOpen(false);*/}
            {/*        }}>*/}
            {/*        <ListItemText primary="Logout" />*/}
            {/*    </ListItem>*/}
                <ListItem key="Close" onClick={() => setDrawerOpen(false)}>
                    <ListItemText primary="Close" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default DrawerComponent_OLD;
