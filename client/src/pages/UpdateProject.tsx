import { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { useCookies } from 'react-cookie';
import {
    Box,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    createTheme,
    ThemeProvider
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

interface Project {
    projectName?: string;
    description?: string;
    videoLink?: string;
    viewCode?: string;
    visitSite?: string;
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#2196f3'
        },
        secondary: {
            main: '#f44336'
        }
    }
});

const UpdateProject = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>({});
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
    const [ids, setIds] = useState<{ ids?: string }>();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('project/getproject', {
                    headers: { Authorization: `Bearer ${cookies._auth}` }
                });
                // console.log(response.data.data);
                setProjects(response.data.data);
                // console.log(projects);
            } catch (err: any) {
                console.error(err);
            }
        };

        fetchProjects();
    }, [projects]);

    const [cookies] = useCookies(['_auth']);

    const fetchProjects = async () => {
        const response = await axios.get('project/getproject', {
            headers: { Authorization: `Bearer ${cookies._auth}` }
        });
        // console.log(response.data.data);
        setProjects(response.data.data);
    };

    const handleEdit = (projectId: any) => {
        setIds(projectId);
        setIsUpdateDialogOpen(true);
    };

    const handleCloseUpdateDialog = () => {
        setSelectedProject(null);
        setIsUpdateDialogOpen(false);
    };

    const handleUpdate = async (values: Project) => {
        try {
            // console.log(values);
            const response = await axios.patch(`project/updateproject/${ids}`, values, {
                headers: { Authorization: `Bearer ${cookies._auth}` }
            });

            console.log(response);
            handleCloseUpdateDialog();
            fetchProjects();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (projectId: any) => {
        await axios.delete(`project/deleteproject/${projectId}`, {
            headers: { Authorization: `Bearer ${cookies._auth}` }
        });
        fetchProjects();
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h4" sx={{ mb: 4 }}>
                        Projects List
                    </Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Project Title</TableCell>
                                    <TableCell>Update</TableCell>
                                    <TableCell>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {projects.map((project: any) => (
                                    <TableRow key={project._id}>
                                        <TableCell>{project.projectName}</TableCell>
                                        <TableCell>
                                            <IconButton
                                                color="primary"
                                                onClick={() => {
                                                    handleEdit(project._id);
                                                }}
                                            >
                                                <Edit />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                color="secondary"
                                                onClick={() => {
                                                    handleDelete(project._id);
                                                }}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </ThemeProvider>

            <Dialog open={isUpdateDialogOpen} onClose={handleCloseUpdateDialog}>
                <DialogTitle>Update Project</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Project Name"
                        defaultValue={selectedProject?.projectName}
                        onChange={(e: any) => setSelectedProject({ ...selectedProject, projectName: e.target.value })}
                        sx={{ m: 1 }}
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        defaultValue={selectedProject?.description}
                        onChange={(e: any) => setSelectedProject({ ...selectedProject, description: e.target.value })}
                        sx={{ m: 1 }}
                    />
                    <TextField
                        fullWidth
                        label="Video Link"
                        defaultValue={selectedProject?.videoLink}
                        onChange={(e: any) => setSelectedProject({ ...selectedProject, videoLink: e.target.value })}
                        sx={{ m: 1 }}
                    />
                    <TextField
                        fullWidth
                        label="View Code"
                        defaultValue={selectedProject?.viewCode}
                        onChange={(e: any) => setSelectedProject({ ...selectedProject, viewCode: e.target.value })}
                        sx={{ m: 1 }}
                    />
                    <TextField
                        fullWidth
                        label="Visit Site"
                        defaultValue={selectedProject?.visitSite}
                        onChange={(e: any) => setSelectedProject({ ...selectedProject, visitSite: e.target.value })}
                        sx={{ m: 1 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseUpdateDialog}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={() => handleUpdate(selectedProject as Project)}>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default UpdateProject;
