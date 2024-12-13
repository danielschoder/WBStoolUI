import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Container, IconButton, List, ListItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCurrentProject } from '../hooks/useCurrentProject';
//import { useState } from 'react';
//import { useServices } from '../hooks/useServices';
//import { Person } from '../models/Person';

function Persons() {
    const navigate = useNavigate();
    const { project } = useCurrentProject();
    //const { projectService } = useServices();
    //const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

    const handleAddPerson = async () => {
        if (project) {
            //await projectApiService.addPerson(project.id);
            //    navigate(`/projects/${newPerson.id}/edit`);
        }
    };

    //const handleRemovePerson = async () => {
    //    if (project && selectedPerson) {
    //        projectService.removePerson(project, selectedPerson.id);
    //        setDeleteDialogOpen(false);
    //    }
    //}

    if (!project) {
        return <Typography variant="h6">Project not found</Typography>;
    }

    return (
        <Container sx={{ mb: 4 }}>
            <Box display="flex" alignItems="center" mb={2} mt={2}>
                <IconButton onClick={() => navigate('/')} color="primary" style={{ marginRight: '16px' }}>
                    <ArrowBackIcon fontSize="large" />
                </IconButton>
                <Typography variant="h2">
                    Persons & Roles
                </Typography>
            </Box>

            <Box display="flex" justifyContent="flex-end" mb={2}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleAddPerson}
                >
                    Add Person
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

                        <Box flex={1}>
                            <Typography variant="h6" color="text.primary" fontWeight="bold">
                                Email
                            </Typography>
                        </Box>

                        <Box flex={1}>
                            <Typography variant="h6" color="text.primary" fontWeight="bold">
                                Role
                            </Typography>
                        </Box>
                    </Box>
                </ListItem>
                {project.persons?.map((person) => (
                    <ListItem
                        key={person.id}
                        sx={{ backgroundColor: "#f5f5f5", mb: 1, borderRadius: 1, cursor: 'pointer' }}
                    >
                        <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" px={2}>
                            <Box flex={1}>
                                <Typography variant="body1" color="text.secondary" fontWeight="bold">
                                    {person.name}
                                </Typography>
                            </Box>

                            <Box flex={1}>
                                <Typography variant="body1" color="text.secondary" fontWeight="bold">
                                    {person.email}
                                </Typography>
                            </Box>

                            <Box flex={1}>
                                <Typography variant="body1" color="text.secondary" fontWeight="bold">
                                    {person.role}
                                </Typography>
                            </Box>
                        </Box>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
}

export default Persons;
