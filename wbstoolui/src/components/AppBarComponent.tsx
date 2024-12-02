import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { AppBar, Box, Button, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useServices } from '../hooks/useServices';
import LoginDialog from './LoginDialog';
import RegisterDialog from './RegisterDialog';

interface AppBarComponentProps {
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppBarComponent: React.FC<AppBarComponentProps> = ({
    setDrawerOpen
}) => {
    const navigate = useNavigate();
    const { authApiService } = useServices();
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [isLoginDialogOpen, setOpenLoginDialog] = useState(false);
    const [isRegisterDialogOpen, setOpenRegisterDialog] = useState(false);

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={() => setDrawerOpen(true)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div">
                    WBStool
                </Typography>
                <Box sx={{ ml: 'auto' }}>
                    {isAuthenticated ? (
                        <>
                            <Button color="inherit" onClick={() => navigate('/projects')}>
                                My Projects
                            </Button>
                            <Tooltip title={authApiService.getUserEmail()} arrow>
                                <IconButton color="inherit">
                                    <PersonIcon />
                                </IconButton>
                            </Tooltip>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" onClick={() => setOpenLoginDialog(true)}>
                                Login
                            </Button>
                            <Button color="inherit" onClick={() => setOpenRegisterDialog(true)}>
                                Register
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
            <LoginDialog
                open={isLoginDialogOpen}
                onClose={
                    () => {
                        setOpenLoginDialog(false);
                        setAuthenticated(authApiService.isAuthenticated());
                    }
                }
            />
            <RegisterDialog
                open={isRegisterDialogOpen}
                onClose={
                    () => {
                        setOpenRegisterDialog(false);
                        setAuthenticated(authApiService.isAuthenticated());
                    }
                }
            />
        </AppBar>
    );
};

export default AppBarComponent;
