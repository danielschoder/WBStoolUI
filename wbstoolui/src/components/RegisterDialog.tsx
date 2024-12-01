import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { AuthService } from '../hooks/AuthService';
import { RegisterDto } from '../dtos/RegisterDto';

interface RegisterDialogProps {
    open: boolean;
    onClose: () => void;
    onRegister: () => void;
    authService: AuthService;
}

const RegisterDialog: React.FC<RegisterDialogProps> = ({ open, onClose, onRegister, authService }) => {
    const [registerForm, setRegisterForm] = useState<RegisterDto>(new RegisterDto());
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegisterForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRegisterSubmit = async () => {
        const authResponse = await authService.register(registerForm);
        if (authResponse.errorMessage) {
            setErrorMessage(authResponse.errorMessage);
        } else {
            onRegister();
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
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleRegisterSubmit} color="primary">
                    Register
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RegisterDialog;
