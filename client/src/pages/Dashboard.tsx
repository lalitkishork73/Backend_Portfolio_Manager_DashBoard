import React, { useState } from 'react';
import { useSignOut } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { Box, Container, CssBaseline, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, green } from '@mui/material/colors';
import UpdateProject from './UpdateProject';
import CreateProject from './CreateProject';
import ListProject from './ListProject';

const theme = createTheme({
    palette: {
        primary: blue,
        secondary: green
    }
});

const Dashboard = () => {
    const singOut = useSignOut();
    const navigate = useNavigate();

    const logout = () => {
        singOut();
        navigate('/login');
    };

    const [selectedMenu, setSelectedMenu] = useState('create');

    const handleMenuClick = (menu: string) => {
        setSelectedMenu(menu);
    };

    const renderConsole = () => {
        if (selectedMenu === 'create') {
            return <CreateProject />;
        } else if (selectedMenu === 'update') {
            return <UpdateProject />;
        } else {
            return <ListProject />;
        }
    };
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />

                <Box sx={{ display: 'flex' }}>
                    <Drawer
                        sx={{
                            width: 240,
                            flexShrink: 0,
                            '& .MuiDrawer-paper': {
                                width: 240,
                                boxSizing: 'border-box'
                            }
                        }}
                        variant="permanent"
                        anchor="left"
                    >
                        <Toolbar />
                        <Button type="submit" variant="outlined" onClick={logout} fullWidth color="error">
                            Logout
                        </Button>
                        <List>
                            <ListItem button key="create" selected={selectedMenu === 'create'} onClick={() => handleMenuClick('create')}>
                                <ListItemIcon>
                                    <i className="fas fa-plus"></i>
                                </ListItemIcon>
                                <ListItemText primary="Create Project" />
                            </ListItem>
                            <ListItem button key="update" selected={selectedMenu === 'update'} onClick={() => handleMenuClick('update')}>
                                <ListItemIcon>
                                    <i className="fas fa-edit"></i>
                                </ListItemIcon>
                                <ListItemText primary="Update Project" />
                            </ListItem>
                            <ListItem button key="list" selected={selectedMenu === 'list'} onClick={() => handleMenuClick('list')}>
                                <ListItemIcon>
                                    <i className="fas fa-edit"></i>
                                </ListItemIcon>
                                <ListItemText primary="List Project" />
                            </ListItem>
                        </List>
                    </Drawer>
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <Toolbar />
                        <Container maxWidth="lg">
                            <Typography variant="h4" sx={{ mb: 4 }}>
                                {selectedMenu === 'create' ? 'Create Project' : selectedMenu === 'update' ? 'Update Project' : 'List Project'}
                            </Typography>
                            {renderConsole()}
                        </Container>
                    </Box>
                </Box>
            </ThemeProvider>
        </>
    );
};

export default Dashboard;
