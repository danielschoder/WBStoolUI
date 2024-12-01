import { Box, List, ListItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ProjectDto } from '../models/ProjectDto';
import BaseListPage from './BaseListPage';

function Projects() {
    const navigate = useNavigate();

    return (
        <BaseListPage<ProjectDto>
            title="My Projects"
            apiRoute="/projects"
            itemsName="projects"
            renderList={(projects) => (
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
                            </Box>
                        </ListItem>
                    ))}
                </List>
            )}
        />
    );
}

export default Projects;
