import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Container, List, ListItem, Typography } from '@mui/material';
import { useState } from 'react';
import PersonPropertiesComponent from '../components/PersonPropertiesComponent';
import { useCurrentProject } from '../hooks/useCurrentProject';
import { PersonDto } from '../dtos/PersonDto';
import { Person } from '../models/Person';

const Persons = () => {
    const { project, setProject } = useCurrentProject();
    const [selectedPerson, setSelectedPerson] = useState<PersonDto | null>(null);

    const isNewPerson = selectedPerson?.id === '';

    const handlePersonSelected = (person: PersonDto) => {
        if (!isNewPerson) {
            setSelectedPerson(person);
        }
    };

    const handleAddNewPerson = async () => {
        if (project) {
            setSelectedPerson(Person.ToDto(new Person()));
        }
    };

    const clearSelectedPerson = () => {
        setSelectedPerson(null);
    };

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
                            disabled={isNewPerson}
                            onClick={handleAddNewPerson}
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
                                    cursor: isNewPerson ? 'default' : 'pointer'
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
                        {(selectedPerson) && (
                            <PersonPropertiesComponent
                                project={project}
                                selectedPerson={selectedPerson}
                                onProjectReRender={projectReRender}
                                onClearSelectedPerson={clearSelectedPerson}
                            />
                        )}
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}

export default Persons;
