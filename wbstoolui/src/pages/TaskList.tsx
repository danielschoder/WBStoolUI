import ChevronRight from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Container, IconButton, List, ListItem, Typography } from "@mui/material";
import { useState } from "react";
import ElementPropertiesComponent from "../components/ElementPropertiesComponent";
import { useCurrentProject } from '../hooks/useCurrentProject';
import { useServices } from '../hooks/useServices';
import { Element } from "../models/Element";
import { formatMoney } from '../utils/formatters';
import { Project } from '../models/Project';
//import { useEffect, useState } from "react";
//import Error from '../components/Error';
//import Loading from "../components/Loading";

const TaskList = () => {
    const { project, setProject } = useCurrentProject();
    const [selectedElement, setSelectedElement] = useState<Element | null>(null);
    //const [loading, setLoading] = useState<boolean>(true);
    //const [error, setError] = useState<string | null>(null);
    const { projectService } = useServices();

    //useEffect(() => {
    //    if (!projectId) return;

    //    const fetchProject = async () => {
    //        try {
    //            setLoading(true);
    //            setProject(await projectApiService.getProject(projectId));
    //        } catch {
    //            setError("Failed to fetch project.");
    //        } finally {
    //            setLoading(false);
    //        }
    //    };

    //    fetchProject();
    //}, [projectApiService, projectId, setProject]);

    const handleElementSelected = (element: Element) => {
        setSelectedElement(element);
    };

    const toggleElementExpansion = (element: Element) => {
        if (project && element) {
            element.isCollapsed = !element.isCollapsed;
            if (element != selectedElement) {
                setSelectedElement(element);
            }
            projectReRender();
        }
    };

    const projectReRender = () => {
        if (project) {
            //project.populateElements();
            if (projectService.newSelectedElement) {
                setSelectedElement(projectService.newSelectedElement);
                projectService.newSelectedElement = null;
            }
            setProject(Project.fromPlainObject({ ...project }));
        }
    }

    //if (loading) { return <Loading />; }
    //if (error) { return <Error error={error} />; }
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
                                        Status
                                    </Typography>
                                </Box>

                                <Box flex={1}>
                                    <Typography variant="h6" color="text.primary" fontWeight="bold" sx={{ textAlign: 'right' }}>
                                        Effort
                                    </Typography>
                                </Box>

                                <Box flex={1}>
                                    <Typography variant="h6" color="text.primary" fontWeight="bold" sx={{ textAlign: 'right' }}>
                                        Ext. Cost
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
                                            {Element.getItemLabel(element)}
                                        </Typography>
                                    </Box>

                                    <Box flex={1}>
                                        <Typography variant="body1" color="primary">
                                            {element.status === 2
                                                ? "Finished"
                                                : element.status === 1
                                                    ? "Started"
                                                    : "Planned"}
                                        </Typography>
                                    </Box>

                                    <Box flex={1}>
                                        <Typography variant="body1" color="primary" sx={{ textAlign: 'right' }}>
                                            {element.effortPlanned}
                                        </Typography>
                                    </Box>

                                    <Box flex={1}>
                                        <Typography variant="body1" color="primary" sx={{ textAlign: 'right' }}>
                                            {formatMoney(element.extCostPlanned)}
                                        </Typography>
                                    </Box>
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                </Box>

                <Box sx={{ borderLeft: '1px solid #ccc', height: 'auto', mr: 2 }} />

                <Box sx={{ width: '400px', position: 'relative', mt: '9px' }}>
                    {selectedElement && (
                        <ElementPropertiesComponent
                            project={project}
                            selectedElement={selectedElement}
                            onProjectReRender={projectReRender}
                        />
                    )}
                </Box>
            </Box>
        </Container>;
    }
};

export default TaskList;
