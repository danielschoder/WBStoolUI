import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, IconButton, List, ListItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Project } from '../models/Project';
import BaseListPage from './BaseListPage';

function Projects() {
    const navigate = useNavigate();

    const handleAddProject = () => {
        navigate('/projects/new'); // Navigate to a form to create a new project
    };

    const handleDeleteProject = (projectId: string, refreshData: () => void) => {
        // Implement deletion logic
        console.log(`Delete project with ID: ${projectId}`);
        refreshData();
    };

    return (
        <BaseListPage<Project>
            title="My Projects"
            apiRoute="/projects"
            itemsName="projects"
            renderList={(projects, refreshData) => (
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
                                            handleDeleteProject(project.id, refreshData);
                                        }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                </>
            )}
        />
    );
}

export default Projects;
