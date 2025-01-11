import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import { useServices } from '../hooks/useServices';
import { UserUpdateDto } from '../dtos/UserUpdateDto';
import { UserDto } from '../dtos/UserDto';

const Account: React.FC = () => {
    const { authApiService } = useServices();
    const [initialUser, setInitialUser] = useState<UserDto | null>(authApiService.getUser());
    const [user, setUser] = useState<UserDto | null>(initialUser);
    const isSaveDisabled =
        user &&
        initialUser &&
        user.email === initialUser.email &&
        user.name === initialUser.name &&
        user.nickName === initialUser.nickName || false;

    const handleSave = async () => {
        if (user) {
            await authApiService.updateUser(new UserUpdateDto(user.email, user.name, user.nickName));
            setInitialUser({ ...user });
        }
    };

    const handleFieldChange = (field: keyof UserDto, value: string) => {
        setUser((prevUser) => prevUser ? { ...prevUser, [field]: value } : null);
    };

    return (
        <Container sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>My Account</Typography>
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', maxWidth: '50%', gap: 2 }}>
                <TextField
                    label="Email"
                    type="email"
                    value={user?.email || ''}
                    onChange={(e) => handleFieldChange('email', e.target.value.toLowerCase())}
                />
                <TextField
                    label="Name"
                    value={user?.name || ''}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                />
                <TextField
                    label="NickName"
                    value={user?.nickName || ''}
                    onChange={(e) => handleFieldChange('nickName', e.target.value)}
                />
                <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={isSaveDisabled}
                    title="Save Account"
                >
                    Save Account
                </Button>
            </Box>
        </Container>
    );
};

export default Account;
