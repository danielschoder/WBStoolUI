import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { RegisterDto } from '../dtos/RegisterDto';
import { useServices } from '../hooks/useServices';

interface RegisterDialogProps {
    open: boolean;
    onClose: () => void;
}

const RegisterDialog: React.FC<RegisterDialogProps> = ({ open, onClose }) => {
    const [registerForm, setRegisterForm] = useState<RegisterDto>(new RegisterDto());
    const [errorMessage, setErrorMessage] = useState<string>('');
    const { authApiService } = useServices();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegisterForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRegisterSubmit = async () => {
        const error = await authApiService.register(registerForm);
        if (error) {
            setErrorMessage(error);
        } else {
            setRegisterForm(new RegisterDto());
            setErrorMessage('');
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Register</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                    variant="standard"
                    value={registerForm.email}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="standard"
                    value={registerForm.password}
                    onChange={handleInputChange}
                />
                {errorMessage && (
                    <Typography color="error" sx={{ mt: 1 }}>
                        {errorMessage}
                    </Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" title="Cancel">
                    Cancel
                </Button>
                <Button onClick={handleRegisterSubmit} color="primary" title="Register">
                    Register
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RegisterDialog;
