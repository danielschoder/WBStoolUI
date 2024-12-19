import React from 'react';
import { Box, TextField, Typography, Container } from '@mui/material';
import { useCurrentProject } from '../hooks/useCurrentProject';
import { Project } from '../models/Project';

const ProjectSettings: React.FC = () => {
    const { project, setProject } = useCurrentProject();

    const onProjectChanged = () => {
        if (project) {
            project.areChangesPending = true;
            setProject(Project.fromPlainObject({ ...project }));
        }
    }

    const handleCurrencyChange = (newCurrency: string) => {
        if (project) {
            project.settings.currencySymbol = newCurrency;
            onProjectChanged();
        }
    };

    return (
        <Container sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>Project Settings</Typography>
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', maxWidth: '50%', gap: 2 }}>
                <TextField
                    label="Currency Symbol"
                    value={project?.settings.currencySymbol}
                    onChange={(e) => handleCurrencyChange(e.target.value)}
                />
            </Box>
        </Container>
    );
};

export default ProjectSettings;
