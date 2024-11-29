import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';
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
    handleLogout: () => void;
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
    handleRegisterSubmit,
    handleLogout
}) => (
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
                        <Button color="inherit">
                            {authService.getUserEmail()}
                        </Button>
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
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

export default AppBarComponent;
