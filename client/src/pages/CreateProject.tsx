import * as React from 'react';
import { useState } from 'react';
import { Box, Button, FormControl, FormHelperText, Input, InputLabel, TextField, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, green } from '@mui/material/colors';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from '../utils/axios';
import { useCookies } from 'react-cookie';

const theme = createTheme({
    palette: {
        primary: blue,
        secondary: green
    }
});

interface FormValues {
    projectName?: string;
    description?: string;
    videoLink?: string;
    viewCode?: string;
    visitSite?: string;
}

const initialValues: FormValues = {
    projectName: '',
    description: '',
    videoLink: '',
    viewCode: '',
    visitSite: ''
};

const validationSchema = Yup.object({
    projectName: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    videoLink: Yup.string().required('Required'),
    viewCode: Yup.string().required('Required'),
    visitSite: Yup.string().required('Required')
});

const CreateProject = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [token] = useCookies(['_auth', '_auth_state']);

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values: FormValues) => {
            setIsSubmitting(true);
            // formik.setFieldValue('user', token._auth_state.id); /*  */
            console.log(values);

            // console.log(values);
            createProject(values);

            setIsSubmitting(false);
        }
    });
    // formik.values.viewCode= token._auth_state.id
    const createProject = async (values: FormValues) => {
        try {
            console.log(values);
            const response = await axios.post(`project/createproject/${token._auth_state.id}`, values, {
                headers: { Authorization: `Bearer ${token._auth}` }
            });
        } catch (err: any) {
            console.log(err);
        }
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <Box sx={{ mt: 4 }}>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <InputLabel htmlFor="projectName">Project Name</InputLabel>
                            <Input id="projectName" name="projectName" value={formik.values.projectName} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.touched.projectName && formik.errors.projectName ? <FormHelperText error>{formik.errors.projectName}</FormHelperText> : null}
                        </FormControl>
                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <TextField
                                id="description"
                                name="description"
                                label="Description"
                                multiline
                                rows={4}
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.description && formik.errors.description ? <FormHelperText error>{formik.errors.description}</FormHelperText> : null}
                        </FormControl>
                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <InputLabel htmlFor="videoLink">Video Link</InputLabel>
                            <Input id="videoLink" name="videoLink" value={formik.values.videoLink} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.touched.videoLink && formik.errors.videoLink ? <FormHelperText error>{formik.errors.videoLink}</FormHelperText> : null}
                        </FormControl>
                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <InputLabel htmlFor="viewCode">View Code</InputLabel>
                            <Input id="viewCode" name="viewCode" value={formik.values.viewCode} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.touched.viewCode && formik.errors.viewCode ? <FormHelperText error>{formik.errors.viewCode}</FormHelperText> : null}
                        </FormControl>
                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <InputLabel htmlFor="visitSite">visitSite</InputLabel>
                            <Input id="visitSite" name="visitSite" value={formik.values.visitSite} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.touched.visitSite && formik.errors.visitSite ? <FormHelperText error>{formik.errors.visitSite}</FormHelperText> : null}
                        </FormControl>
                        <Button type="submit" variant="outlined">
                            Create
                        </Button>
                    </form>
                </Box>
            </ThemeProvider>
        </>
    );
};

export default CreateProject;
