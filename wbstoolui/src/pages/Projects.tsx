import AddIcon from '@mui/icons-material/AddOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, List, ListItem, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentProject } from '../hooks/useCurrentProject';
import { useServices } from '../hooks/useServices';
import { Project } from '../models/Project';
import BasePaginatedListPage from './BasePaginatedListPage';

function Projects() {
    const navigate = useNavigate();
    const { setProject } = useCurrentProject();
    const { projectApiService } = useServices();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const handleAddProject = async () => {
        setProject(await projectApiService.createProject());
        navigate("/tasklist");
    };

    const handleSelectProject = async (project: Project) => {
        setProject(await projectApiService.getProject(project.id));
        navigate(`/tasklist`);
    };

    const openDeleteDialog = (project: Project) => {
        setSelectedProject(project);
        setDeleteDialogOpen(true);
    };

    const closeDeleteDialog = () => {
        setDeleteDialogOpen(false);
        setSelectedProject(null);
    };

    return (
        <BasePaginatedListPage<Project>
            title="My Projects"
            apiRoute="/projects"
            itemsName="projects"
            action={
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleAddProject}
                >
                    Create Project
                </Button>
            }
            renderList={(projects, refreshData) => {
                const confirmDeleteProject = async () => {
                    if (selectedProject) {
                        await projectApiService.deleteProject(selectedProject.id);
                        setDeleteDialogOpen(false);
                        refreshData();
                    }
                };

                return (
                    <>
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
                                    onClick={() => handleSelectProject(project)}
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
                                                openDeleteDialog(project);
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
                                    Are you sure you want to delete <b>{selectedProject?.name}</b>?
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
