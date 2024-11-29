import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { AuthService } from '../hooks/AuthService';
import { LoginDto } from '../dtos/LoginDto';

interface LoginDialogProps {
    open: boolean;
    onClose: () => void;
    onLogin: () => void;
    authService: AuthService;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ open, onClose, onLogin, authService }) => {
    const [loginForm, setLoginForm] = useState<LoginDto>(new LoginDto());
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLoginSubmit = async () => {
        const authResponse = await authService.login(loginForm);
        if (authResponse.errorMessage) {
            setErrorMessage(authResponse.errorMessage);
        } else {
            onLogin();
            setLoginForm(new LoginDto());
            setErrorMessage(''); 
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="email"
                    label="Email"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={loginForm.email}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="standard"
                    value={loginForm.password}
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
                <Button onClick={handleLoginSubmit} color="primary">
                    Login
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default LoginDialog;
