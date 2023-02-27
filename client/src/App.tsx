import React from 'react';
import './App.css';
import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';

function App() {
    return (
        <>
            <Box sx={{ backgroundColor: '#fff' }}>
                <Login />
                <Routes>
                    {/* <Route path="/" element={<Login />}></Route> */}
                </Routes>
            </Box>
        </>
    );
}

export default App;
