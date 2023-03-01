import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { maxHeight } from '@mui/system';
import axios from '../utils/axios';
import { AxiosError } from 'axios';
import { useSignIn } from 'react-auth-kit';
import { useNavigate, Navigate } from 'react-router-dom';

interface FormValues {
    username: string;
    password: string;
}

interface FormErrors {
    username?: string;
    password?: string;
}

const Login = () => {
    const [formData, setFormData] = useState<FormValues>({ username: '', password: '' });
    const [formErrors, setFormErrors] = useState<FormErrors>({});

    const navigate = useNavigate();

    const [error, setError] = useState('');

    const signIn = useSignIn();

    const validateForm = (): boolean => {
        let errors: FormErrors = {};
        let isValid = true;

        if (!formData.username) {
            isValid = false;
            errors.username = 'Username is required';
        }

        if (!formData.password) {
            isValid = false;
            errors.password = 'Password is required';
        }

        setFormErrors(errors);

        return isValid;
    };

    const postData = async (data: any) => {
        try {
            const response = await axios.post('/user/login', data);
            if (response?.data?.status == true) navigate('/');

            signIn({
                token: response.data.token,
                expiresIn: 3600,
                tokenType: 'Bearer',
                authState: { id: response.data.userId, email: data.email }
            });
        } catch (err: any) {
            if (err && err instanceof AxiosError) setError(err.response?.data.message);
            else if (err && err instanceof Error) setError(err.message);

            console.log('Error: ', err);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        if (validateForm()) {
            // Form submission logic here
            let data = {
                email: formData.username,
                password: formData.password
            };

            postData(data);
        }
    };
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '85vh',
                    backgroundImage: 'linear-gradient(to bottom right,  #1EffFF, #FFFFff)'
                }}
            >
                <form onSubmit={handleSubmit}>
                    <Typography variant="h6" sx={{ marginBottom: 2 }}>
                        Login
                    </Typography>
                    <TextField
                        label="Username"
                        variant="outlined"
                        margin="normal"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        fullWidth
                        error={Boolean(formErrors.username)}
                        helperText={formErrors.username}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        margin="normal"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        fullWidth
                        error={Boolean(formErrors.password)}
                        helperText={formErrors.password}
                    />
                    <Button type="submit" variant="contained" fullWidth color="primary">
                        Login
                    </Button>
                </form>
            </Box>
        </>
    );
};

export default Login;
