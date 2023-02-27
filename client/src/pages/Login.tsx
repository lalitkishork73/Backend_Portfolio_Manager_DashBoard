import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { maxHeight } from '@mui/system';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handlePasswordChange = () => {};

    const handleUsernameChange = () => {};

    const handleSubmit = () => {};
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    backgroundImage: 'linear-gradient(to bottom right,  #1EffFF, #FFFFff)'
                }}
            >
                <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 300, maxHeight: '100vh', color: 'white' }}>
                    <Typography variant="h6" sx={{ marginBottom: 2 }}>
                        Login
                    </Typography>
                    <TextField label="Username" variant="outlined" margin="normal" value={username} onChange={handleUsernameChange} fullWidth    />
                    <TextField label="Password" variant="outlined" margin="normal" type="password" value={password} onChange={handlePasswordChange} fullWidth />
                    <Button type="submit" variant="contained" fullWidth color="primary">
                        Login
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default Login;
