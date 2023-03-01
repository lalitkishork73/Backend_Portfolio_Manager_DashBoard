import React from 'react';
import './App.css';
import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from 'react-auth-kit';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
    return (
        <>
            <Box sx={{ backgroundColor: '#fff' }}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <RequireAuth loginPath="/login">
                                <Dashboard />
                            </RequireAuth>
                        }
                    ></Route>
                    <Route path="/login" element={<Login />}></Route>
                </Routes>
            </Box>
        </>
    );
}

export default App;
