import ListIcon from '@mui/icons-material/List';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import SaveIcon from '@mui/icons-material/Save';
import { AppBar, Box, Button, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentProject } from '../hooks/useCurrentProject';
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
    const { project } = useCurrentProject();
    const { projectApiService, authApiService } = useServices();
    const [isAuthenticated, setAuthenticated] = useState(authApiService.isAuthenticated());
    const [isLoginDialogOpen, setOpenLoginDialog] = useState(false);
    const [isRegisterDialogOpen, setOpenRegisterDialog] = useState(false);

    const saveProject = async () => {
        if (project) {
            await projectApiService.updateProject(project);
        }
    };

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
                    WBStool{project ? ` - ${project.name}` : ``}
                </Typography>
                <Box sx={{ ml: 'auto' }}>
                    {isAuthenticated ? (
                        <>
                            <Tooltip title="Save project" arrow>
                                <IconButton color="inherit" onClick={saveProject}>
                                    <SaveIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="My projects" arrow>
                                <IconButton color="inherit" onClick={() => navigate('/projects')}>
                                    <ListIcon />
                                </IconButton>
                            </Tooltip>
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
