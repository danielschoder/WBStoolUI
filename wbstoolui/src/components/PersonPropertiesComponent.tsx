import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { PersonDto } from "../dtos/PersonDto";
import { Project } from "../models/Project";

interface PersonPropertiesComponentProps {
    project: Project;
    selectedPerson: PersonDto;
    onProjectReRender: () => void;
    onClearSelectedPerson: () => void;
}

const PersonPropertiesComponent: React.FC<PersonPropertiesComponentProps> = ({
    project, selectedPerson, onClearSelectedPerson, onProjectReRender
}) => {
    const [emailError, setEmailError] = useState<string | null>(null);

    const isNewPerson = selectedPerson?.id === '';

    const handleRoleChange = (newRole: string) => {
        selectedPerson.role = newRole;
        onProjectReRender();
    };

    const handleEmailChange = (newEmail: string) => {
        setEmailError(null);
        selectedPerson.email = newEmail;
        onProjectReRender();
    };

    const handleRemovePerson = () => {
        project.removePerson(selectedPerson.id);
        onClearSelectedPerson();
        onProjectReRender();
    };

    const handleAddNewPerson = () => {
        if (!selectedPerson.email || selectedPerson.email.trim() === '') {
            setEmailError('Email is required.');
            return;
        }
        const error = project.addPerson(selectedPerson);
        if (error) {
            setEmailError(error);
            return;
        }
        onClearSelectedPerson();
        onProjectReRender();
    };

    const handleClose = () => {
        onClearSelectedPerson();
        onProjectReRender();
    };

    return (
        <Box>
            <TextField
                label="Name"
                value={selectedPerson.name}
                disabled={true}
                fullWidth
                variant="outlined"
            />

            <TextField
                sx={{ mt: 2 }}
                label="Email*"
                value={selectedPerson.email}
                onChange={(e) => handleEmailChange(e.target.value)}
                disabled={!isNewPerson}
                fullWidth
                variant="outlined"
                error={!!emailError}
                helperText={emailError}
            />

            <TextField
                sx={{ mt: 2 }}
                label="Role"
                value={selectedPerson.role}
                onChange={(e) => handleRoleChange(e.target.value)}
                fullWidth
                variant="outlined"
            />

            {isNewPerson ? (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mt: 2 }}>
                    <Button variant="outlined" color="primary" title="Cancel" sx={{ flex: 1 }} onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" title="Add" sx={{ flex: 1 }} onClick={handleAddNewPerson}>
                        Add
                    </Button>
                </Box>
            ) : (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mt: 2 }}>
                        <Button variant="contained" color="primary" title="Remove Person" sx={{ flex: 1 }} onClick={handleRemovePerson}>
                            Remove Person
                        </Button>
                        <Button variant="outlined" color="primary" title="Close" sx={{ flex: 1 }} onClick={handleClose}>
                            Close
                        </Button>
                    </Box>
            )}
        </Box>
    );
};

export default PersonPropertiesComponent;
