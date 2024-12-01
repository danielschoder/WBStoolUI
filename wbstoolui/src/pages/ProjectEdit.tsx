import { Box, Button, Container } from "@mui/material";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Error from '../components/Error';
import Loading from "../components/Loading";
import PropertiesComponent from "../components/PropertiesComponent";
import { ProjectService } from "../hooks/ProjectService";
import { ProjectDto } from "../models/ProjectDto";
import { ElementDto } from "../models/ElementDto";

const ProjectEdit = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const [project, setProject] = useState<ProjectDto | null>(null);
    const [selectedItem, setSelectedItem] = useState<ElementDto | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const projectService = useMemo(() => new ProjectService(), []);

    useEffect(() => {
        if (!projectId) return;
        const fetchProject = async () => {
            try {
                setLoading(true);
                setProject(await projectService.getProject(projectId));
            } catch {
                setError("Failed to fetch project.");
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [projectService, projectId]);

    if (loading) { return <Loading />; }
    if (error) { return <Error error={error} />; }

    const handleExpansionChange = (_event: React.SyntheticEvent, itemIds: string[]) => {
        if (project) {
            project.settings.expandedElementIds = itemIds;
        }
    };

    const saveProject = async () => {
        if (project) await projectService.updateProject(project);
    };

    const findElementById = (elements: ElementDto[], id: string): ElementDto | null => {
        for (const element of elements) {
            if (element.id === id) {
                return element;
            }
            if (element.children) {
                const foundInChildren = findElementById(element.children, id);
                if (foundInChildren) {
                    return foundInChildren;
                }
            }
        }
        return null;
    };

    const handleItemSelectionToggle = (
        _event: React.SyntheticEvent,
        itemId: string,
        isSelected: boolean,
        ) => {
        if (project && isSelected) {
            setSelectedItem(findElementById(project.elements, itemId));
        }
    };

    const handleLabelChange = (newLabel: string) => {
        if (project && selectedItem) {
            selectedItem.label = newLabel;
            setProject(project);
        }
    };

    return project ? (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, height: '100%' }}>
                <Box sx={{ flex: 1, mr: 2 }}>
                    <RichTreeView
                        items={project.elements}
                        defaultExpandedItems={project.settings.expandedElementIds || []}
                        onExpandedItemsChange={handleExpansionChange}
                        expansionTrigger="iconContainer"
                        onItemSelectionToggle={handleItemSelectionToggle}
                        itemChildrenIndentation={24}
                    />
                </Box>

                <Box sx={{ borderLeft: '2px solid #ccc', height: 'auto', mr: 2 }} />

                <Box sx={{ width: '300px' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                        <Button variant="contained" color="primary" onClick={saveProject}>
                            Save Project
                        </Button>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        {selectedItem ? (
                            <PropertiesComponent
                                selectedItem={selectedItem}
                                onLabelChange={handleLabelChange}
                            />
                        ) : (
                            <p>Select an item to edit</p>
                        )}
                    </Box>
                </Box>
            </Box>
        </Container>
    ) : <Container></Container>;
};

export default ProjectEdit;
