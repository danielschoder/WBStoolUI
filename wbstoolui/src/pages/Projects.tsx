import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, List, ListItem, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useServices } from '../hooks/useServices';
import { Project } from '../models/Project';
import BaseListPage from './BaseListPage';

function Projects() {
    const navigate = useNavigate();
    const { projectApiService } = useServices();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
    const [selectedProjectName, setSelectedProjectName] = useState<string | null>(null);

    const handleAddProject = async () => {
        const newProject = await projectApiService.createProject();
        navigate(`/projects/${newProject.id}/edit`);
    };

    const openDeleteDialog = (projectId: string) => {
        setSelectedProjectId(projectId);
        setDeleteDialogOpen(true);
    };

    const closeDeleteDialog = () => {
        setDeleteDialogOpen(false);
        setSelectedProjectId(null);
    };

    return (
        <BaseListPage<Project>
            title="My Projects"
            apiRoute="/projects"
            itemsName="projects"
            renderList={(projects, refreshData) => {
                const confirmDeleteProject = async () => {
                    if (selectedProjectId) {
                        await projectApiService.deleteProject(selectedProjectId);
                        setDeleteDialogOpen(false);
                        refreshData();
                    }
                };

                return (
                    <>
                        <Box display="flex" justifyContent="flex-end" mb={2}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AddIcon />}
                                onClick={handleAddProject}
                            >
                                Create Project
                            </Button>
                        </Box>

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
                            {projects?.map((project) => (
                                <ListItem
                                    key={project.id}
                                    sx={{ backgroundColor: "#f5f5f5", mb: 1, borderRadius: 1, cursor: 'pointer' }}
                                    onClick={() => navigate(`/projects/${project.id}/edit`)}
                                >
                                    <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" px={2}>
                                        <Box flex={1}>
                                            <Typography variant="body1" color="text.secondary" fontWeight="bold">
                                                {project.name}
                                            </Typography>
                                        </Box>

                                        {/*    <Box flex={1}>*/}
                                        {/*        <Button*/}
                                        {/*            variant="outlined"*/}
                                        {/*            href={season.wikipediaUrl}*/}
                                        {/*            target="_blank"*/}
                                        {/*            rel="noopener noreferrer"*/}
                                        {/*            style={{ textTransform: 'lowercase' }}*/}
                                        {/*        >*/}
                                        {/*            Wikipedia*/}
                                        {/*        </Button>*/}
                                        {/*    </Box>*/}

                                        <IconButton
                                            edge="end"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedProjectName(project.name);
                                                openDeleteDialog(project.id);
                                            }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </ListItem>
                            ))}
                        </List>

                        <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
                            <DialogTitle>Confirm Project Deletion</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Are you sure you want to delete <b>{selectedProjectName}</b>?
                                    <br />
                                    <br />This action cannot be undone.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={closeDeleteDialog} color="primary" autoFocus>
                                    Cancel
                                </Button>
                                <Button onClick={confirmDeleteProject} color="error">
                                    Delete
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </>
                )
            }}
        />
    );
}

export default Projects;
