import * as React from 'react';
import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CircularProgress
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, red } from '@mui/material/colors';
import { Delete, Edit } from '@mui/icons-material';
import axios from '../utils/axios';
import { useCookies } from 'react-cookie';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

const theme = createTheme({
    palette: {
        primary: blue,
        secondary: red
    }
});

interface Project {
    id: number;
    projectName: string;
    description: string;
    videoLink: string;
    viewCode: string;
    visitSite: string;
}


const UpdateProject = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    const [cookies] = useCookies(['_auth']);
    // console.log(cookies._auth);

    const fetchProjects = async () => {
        const response = await axios.get('project/getproject', { headers: { Authorization: `Bearer ${cookies._auth}` } });
        console.log(response.data.data[0].projectName);
        setProjects(response.data.data);
        console.log(projects[0].projectName);
    };

    const updateValidationSchema = yup.object().shape({
        projectName: yup.string().required('Required'),
        description: yup.string().required('Required'),
        viewCode: yup.string().url('Must be a valid URL'),
        videoLink: yup.string().url('Must be a valid URL')
    });

    const handleEdit = (projectId: number) => {
        const project = projects.find((p) => p.id === projectId);
        setSelectedProject(project ?? null);
        setIsUpdateDialogOpen(true);
    };

    const handleCloseUpdateDialog = () => {
        setSelectedProject(null);
        setIsUpdateDialogOpen(false);
    };

    const handleUpdate = async (values: Project) => {
        try {
            await axios.put(`http://localhost:3000/projects/${selectedProject?.id}`, values);
            handleCloseUpdateDialog();
            fetchProjects();
        } catch (error) {
            console.error(error);
            // handle error here
        }
    };

    const handleDelete = async (projectId: number) => {
        await axios.delete(`http://localhost:3000/projects/${projectId}`);
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
                                {projects.map((project) => (
                                    <TableRow key={project.id}>
                                        <TableCell>{project.projectName}</TableCell>
                                        <TableCell>
                                            <IconButton color="primary" onClick={() => handleEdit(project.id)}>
                                                <Edit />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton color="secondary" onClick={() => handleDelete(project.id)}>
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
        </>
    );
};

export default UpdateProject;
