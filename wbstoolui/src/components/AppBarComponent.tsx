import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { AppBar, Box, Button, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../hooks/AuthService';
import LoginDialog from './LoginDialog';
import RegisterDialog from './RegisterDialog';

interface AppBarComponentProps {
    authService: AuthService;
    isAuthenticated: boolean;
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isLoginDialogOpen: boolean;
    setOpenLoginDialog: React.Dispatch<React.SetStateAction<boolean>>;
    handleLoginOpen: () => void;
    handleLoginSubmit: () => void;
    isRegisterDialogOpen: boolean;
    setOpenRegisterDialog: React.Dispatch<React.SetStateAction<boolean>>;
    handleRegisterOpen: () => void;
    handleRegisterSubmit: () => void;
}

const AppBarComponent: React.FC<AppBarComponentProps> = ({
    authService,
    isAuthenticated,
    setDrawerOpen,
    isLoginDialogOpen,
    setOpenLoginDialog,
    handleLoginOpen,
    handleLoginSubmit,
    isRegisterDialogOpen,
    setOpenRegisterDialog,
    handleRegisterOpen,
    handleRegisterSubmit
}) => {
    const navigate = useNavigate();

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
                            <Tooltip title={authService.getUserEmail()} arrow>
                                <IconButton color="inherit">
                                    <PersonIcon />
                                </IconButton>
                            </Tooltip>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" onClick={handleLoginOpen}>
                                Login
                            </Button>
                            <Button color="inherit" onClick={handleRegisterOpen}>
                                Register
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
            <LoginDialog
                open={isLoginDialogOpen}
                onClose={() => setOpenLoginDialog(false)}
                onLogin={handleLoginSubmit}
                authService={authService}
            />
            <RegisterDialog
                open={isRegisterDialogOpen}
                onClose={() => setOpenRegisterDialog(false)}
                onRegister={handleRegisterSubmit}
                authService={authService}
            />
        </AppBar>
    );
};

export default AppBarComponent;
