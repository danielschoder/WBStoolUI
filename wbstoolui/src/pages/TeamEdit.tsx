import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, List, ListItem, Typography } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useServices } from '../hooks/useServices';
import { Person } from '../models/Person';
import BaseListPage from './BaseListPage';

function TeamEdit() {
    const { projectId } = useParams<{ projectId: string }>();
    const { projectApiService } = useServices();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

    const handleAddPerson = async () => {
        if (projectId) {
            await projectApiService.addPerson(projectId);
            //    navigate(`/projects/${newPerson.id}/edit`);
        }
    };

    const openDeleteDialog = (person: Person) => {
        setSelectedPerson(person);
        setDeleteDialogOpen(true);
    };

    const closeDeleteDialog = () => {
        setDeleteDialogOpen(false);
        setSelectedPerson(null);
    };

    return (
        <BaseListPage<Person>
            title={`Project Team`}
            apiRoute={`/projects/${projectId}/persons`}
            renderList={(persons, refreshData) => {
                const confirmDeletePerson = async () => {
                    if (projectId && selectedPerson) {
                        await projectApiService.removePerson(projectId, selectedPerson.id);
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
                                onClick={handleAddPerson}
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
                                    <Box flex={1}>
                                        <Typography variant="h6" color="text.primary" fontWeight="bold">
                                            Email
                                        </Typography>
                                    </Box>
                                </Box>
                            </ListItem>
                            {persons?.map((person) => (
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

                                        <IconButton
                                            edge="end"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openDeleteDialog(person);
                                            }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </ListItem>
                            ))}
                        </List>

                        <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
                            <DialogTitle>Confirm Remove Team Member</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Are you sure you want to remove <b>{selectedPerson?.name}</b>?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={closeDeleteDialog} color="primary" autoFocus>
                                    Cancel
                                </Button>
                                <Button onClick={confirmDeletePerson} color="error">
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

export default TeamEdit;
