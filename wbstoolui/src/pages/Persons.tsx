import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Container, IconButton, List, ListItem, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentProject } from '../hooks/useCurrentProject';
//import { useServices } from '../hooks/useServices';
import PersonPropertiesComponent from '../components/PersonPropertiesComponent';
import { Person } from '../models/Person';

const Persons = () => {
    const navigate = useNavigate();
    const { project, setProject } = useCurrentProject();
    //const { projectService } = useServices();
    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

    const handlePersonSelected = (person: Person) => {
        setSelectedPerson(person);
    };

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

    const projectReRender = () => {
        if (project) {
            setProject({ ...project });
        }
    }

    if (!project) {
        return <Typography variant="h6">Project not found</Typography>;
    }

    return (
        <Container sx={{ mb: 4 }} maxWidth={false}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Box sx={{ flex: 1, mr: 2 }}>
                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={2} mt={2}>
                        <Typography variant="h2">
                            Persons & Roles
                        </Typography>
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
                                sx={{
                                    backgroundColor: selectedPerson?.id === person.id ? "#ecf1f1" : "#f5f5f5",
                                    mb: 1,
                                    borderRadius: 1,
                                    cursor: 'pointer'
                                }}
                                onClick={() => handlePersonSelected(person)}
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
                </Box>

                <Box sx={{ borderLeft: '2px solid #ccc', height: 'auto', mr: 2 }} />

                <Box sx={{ width: '400px', position: 'relative', mt: '9px' }}>
                    <Box sx={{ mt: 2 }}>
                        {selectedPerson && (
                            <PersonPropertiesComponent
                                project={project}
                                selectedPerson={selectedPerson}
                                onProjectReRender={projectReRender}
                            />
                        )}
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}

export default Persons;
