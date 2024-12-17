import ListIcon from '@mui/icons-material/ListOutlined';
import MenuIcon from '@mui/icons-material/MenuOutlined';
import PersonIcon from '@mui/icons-material/PersonOutlined';
import SaveIcon from '@mui/icons-material/SaveOutlined';
import { AppBar, Box, Button, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { drawerWidth } from '../constants';
import { useCurrentProject } from '../hooks/useCurrentProject';
import { useServices } from '../hooks/useServices';
import { Project } from '../models/Project';
import LoginDialog from './LoginDialog';
import RegisterDialog from './RegisterDialog';

interface AppBarComponentProps {
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    drawerOpen: boolean;
}

const AppBarComponent: React.FC<AppBarComponentProps> = ({
    setDrawerOpen,
    drawerOpen
}) => {
    const navigate = useNavigate();
    const { project, setProject } = useCurrentProject();
    const { projectApiService, authApiService } = useServices();
    const [isAuthenticated, setAuthenticated] = useState(authApiService.isAuthenticated());
    const [isLoginDialogOpen, setOpenLoginDialog] = useState(false);
    const [isRegisterDialogOpen, setOpenRegisterDialog] = useState(false);

    const saveProject = async () => {
        if (project) {
            await projectApiService.updateProject(project);
            setProject(Project.fromPlainObject({ ...project }));
        }
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                transition: 'margin 0.3s',
                marginLeft: drawerOpen ? drawerWidth : 0,
                width: drawerOpen ? `calc(100% - ${drawerWidth}px)` : '100%',
            }}
        >
            <Toolbar>
                {!drawerOpen && (
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={() => setDrawerOpen(true)}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                )}
                <Typography variant="h6" component="div">
                    WBStool{project ? ` - ${project.name}` : ``}
                </Typography>
                <Box sx={{ ml: 'auto' }}>
                    {isAuthenticated ? (
                        <>
                            {project?.areChangesPending && (
                                <Tooltip title="Save project" arrow>
                                    <IconButton color="inherit" onClick={saveProject}>
                                        <SaveIcon />
                                    </IconButton>
                                </Tooltip>
                            )}
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
