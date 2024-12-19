import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import { useServices } from '../hooks/useServices';

const Account: React.FC = () => {
    const { authApiService } = useServices();
    const initialName = authApiService.getUserName() || '';
    const initialEmail = authApiService.getUserEmail() || '';
    const [name, setName] = useState<string>(initialName);
    const [email, setEmail] = useState<string>(initialEmail);
    const isSaveDisabled = name == initialName && email == initialEmail;

    const handleSave = () => {
        console.log('Saved profile', { name, email });
        // Add logic to save the data, e.g., API call
    };

    return (
        <Container sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>My Account</Typography>
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', maxWidth: '50%', gap: 2 }}>
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={isSaveDisabled}
                >
                    Save Account
                </Button>
            </Box>
        </Container>
    );
};

export default Account;
