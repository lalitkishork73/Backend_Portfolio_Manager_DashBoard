import { useState, useEffect } from 'react';
import { Box, Card, CardContent, CardActions, Button, Typography, Pagination, Grid } from '@mui/material';
import axios from '../utils/axios';
import { useCookies } from 'react-cookie';

interface ProjectData {
    projectName: string;
    description: string;
    videoLink: string;
    viewCode: string;
    visitSite: string;
}

interface ProjectCardProps {
    data: ProjectData;
}

function ProjectCard(props: ProjectCardProps) {
    const { data } = props;

    return (
        <Card sx={{ maxWidth: 400, m: 2 }}>
            <CardContent>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {data.projectName}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {data.description}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Video Link
                </Typography>
                <Typography variant="body2">{data.videoLink}</Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    View Code
                </Typography>
                <Typography variant="body2">{data.viewCode}</Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Visit Site
                </Typography>
                <Typography variant="body2">{data.visitSite}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}

function ListProject() {
    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 5;

    const [cookies] = useCookies(['_auth']);

    function handlePageChange(event: React.ChangeEvent<unknown>, value: number) {
        setPage(value);
    }

    function fetchProjects() {
        axios
            .get('project/getproject')
            .then((response) => {
                setProjects(response.data.data);
                console.log(response.data.data);
                setTotalPages(Math.ceil(response.data.data.totalCount / pageSize));
            })
            .catch((error) => {
                console.error(error);
            });
    }

    // Fetch projects on mount and whenever the page changes
    useEffect(() => {
        fetchProjects();
    }, [page]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                {projects.map((project) => (
                    <Grid key={project.projectName} item xs={12} sm={6} md={4}>
                        <ProjectCard data={project} />
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Pagination count={totalPages} page={page} onChange={handlePageChange} />
            </Box>
        </Box>
    );
}

export default ListProject;
