import ChevronRight from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Button, Container, IconButton, List, ListItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Error from '../components/Error';
import Loading from "../components/Loading";
import PropertiesComponent from "../components/PropertiesComponent";
import { useServices } from '../hooks/useServices';
import { Element } from "../models/Element";
import { Project } from "../models/Project";

const ProjectEdit = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const [project, setProject] = useState<Project | null>(null);
    const [selectedElement, setSelectedElement] = useState<Element | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { projectService, projectApiService } = useServices();

    useEffect(() => {
        if (!projectId) return;
        const fetchProject = async () => {
            try {
                setLoading(true);
                setProject(await projectApiService.getProject(projectId));
            } catch {
                setError("Failed to fetch project.");
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [projectApiService, projectId]);

    const handleElementSelected = (element: Element) => {
        setSelectedElement(element);
    };

    const toggleElementExpansion = (element: Element) => {
        if (project && element) {
            element.isCollapsed = !element.isCollapsed;
            if (element != selectedElement) {
                setSelectedElement(element);
            }
            reRender(project);
        }
    };

    const handleLabelChange = (newLabel: string) => {
        if (project && selectedElement) {
            selectedElement.label = newLabel;
            reRender(project);
        }
    };

    const handleAddChild = () => {
        if (project && selectedElement) {
            projectService.AddSubElement(selectedElement);
            reRender(project);
        }
    };

    const reRender = (project: Project) => {
        projectService.populateElements(project);
        setProject({ ...project });
    }

    const saveProject = async () => {
        if (project) {
            await projectApiService.updateProject(project);
        }
    };

    if (loading) { return <Loading />; }
    if (error) { return <Error error={error} />; }
    if (project) {
        return <Container maxWidth={false}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, height: 'calc(100vh - 64px - 24px)' }}>
                <Box sx={{ flex: 1, mr: 2, overflowY: 'auto', height: '100%' }}>
                    <List>
                        <ListItem sx={{ backgroundColor: "#e0e0e0", mb: 1, borderRadius: 1 }}>
                            <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" px={2}>
                                <Box flex={1} sx={{ pl: 5, pr: 30 }}>
                                    <Typography variant="h6" color="text.primary" fontWeight="bold">
                                        Project
                                    </Typography>
                                </Box>

                                <Box flex={1}>
                                    <Typography variant="h6" color="text.primary" fontWeight="bold">
                                        Level
                                    </Typography>
                                </Box>

                                <Box flex={1}>
                                    <Typography variant="h6" color="text.primary" fontWeight="bold">
                                        Index
                                    </Typography>
                                </Box>
                            </Box>
                        </ListItem>

                        {project.elements?.map((element) => (
                            <ListItem
                                key={element.id}
                                sx={{
                                    backgroundColor: selectedElement?.id === element.id ? "#ecf1f1" : "#f5f5f5",
                                    mb: 1,
                                    borderRadius: 1,
                                    cursor: 'pointer'
                                }}
                                onClick={() => handleElementSelected(element)}
                            >
                                <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" px={2}>
                                    {element.elements && element.elements.length > 0 && (
                                        <Box flex={0} sx={{ pl: element.level * 3 }}>
                                            <IconButton onClick={(e) => {
                                                e.stopPropagation();
                                                toggleElementExpansion(element);
                                            }}>
                                                {element.isCollapsed ? <ChevronRight /> : <ExpandMoreIcon />}
                                            </IconButton>
                                        </Box>
                                    )}

                                    <Box flex={1} sx={{
                                        pl: element.elements && element.elements.length > 0 ? 0 : 5 + element.level * 3,
                                        pr: 30 - element.level * 3
                                    }}>
                                        <Typography
                                            variant="body1"
                                            color="text.secondary"
                                            fontWeight="bold"
                                            sx={{
                                                fontWeight: element.elements && element.elements.length > 0 ? 'bold' : 'normal',
                                            }}
                                        >
                                            {projectService.getItemLabel(element)}
                                        </Typography>
                                    </Box>

                                    <Box flex={1}>
                                        <Typography variant="body1" color="primary">
                                            {element.level}
                                        </Typography>
                                    </Box>

                                    <Box flex={1}>
                                        <Typography variant="body1" color="primary">
                                            {element.index}
                                        </Typography>
                                    </Box>
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                </Box>

                <Box sx={{ borderLeft: '2px solid #ccc', height: 'auto', mr: 2 }} />

                <Box sx={{ width: '300px', position: 'relative' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                        <Button variant="contained" color="primary" onClick={saveProject} startIcon={<SaveIcon />}>
                            Save Project
                        </Button>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        {selectedElement ? (
                            <PropertiesComponent
                                selectedElement={selectedElement}
                                onLabelChange={handleLabelChange}
                                onAddChild={handleAddChild}
                            />
                        ) : (
                            <p>Select an item to edit</p>
                        )}
                    </Box>
                </Box>
            </Box>
        </Container>;
    }
};

export default ProjectEdit;
