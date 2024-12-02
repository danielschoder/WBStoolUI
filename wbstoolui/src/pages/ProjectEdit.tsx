import SaveIcon from '@mui/icons-material/Save';
import { Box, Button, Container } from "@mui/material";
import { useTreeViewApiRef } from "@mui/x-tree-view/hooks/useTreeViewApiRef";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Error from '../components/Error';
import Loading from "../components/Loading";
import PropertiesComponent from "../components/PropertiesComponent";
import { Element } from "../models/Element";
import { Project } from "../models/Project";
import { useServices } from '../hooks/useServices';

const ProjectEdit = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const [project, setProject] = useState<Project | null>(null);
    const [selectedElement, setSelectedElement] = useState<Element | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const apiRef = useTreeViewApiRef();
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

    const handleExpansionChange = (_event: React.SyntheticEvent, itemIds: string[]) => {
        if (project) {
            project.settings.expandedElementIds = itemIds;
        }
    };

    const handleItemSelectionToggle = (_event: React.SyntheticEvent, itemId: string, isSelected: boolean) => {
        if (project && isSelected) {
            setSelectedElement(projectService.findElementById(project.elements, itemId));
        }
    };

    const handleLabelChange = (newLabel: string) => {
        if (project && selectedElement) {
            selectedElement.label = newLabel;
            if (apiRef.current) {
                apiRef.current.updateItemLabel(selectedElement.id, getItemLabel(selectedElement));
            }
        }
    };

    const handleAddChild = () => {
        if (!selectedElement) return;

        const newChild: Element = {
            id: crypto.randomUUID(), // Generate unique ID
            number: '',
            label: 'New Child',
            parent: selectedElement,
            children: []
        };
        if (!selectedElement.children) {
            selectedElement.children = [];
        }
        selectedElement.children.push(newChild);

        setSelectedElement({ ...selectedElement });
    };

    const saveProject = async () => {
        if (project) {
            await projectApiService.updateProject(project);
        }
    };

    function getItemLabel(item: Element) {
        return item.number + " " + item.label;
    }

    if (loading) { return <Loading />; }
    if (error) { return <Error error={error} />; }
    if (project) {
        return <Container>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, height: 'calc(100vh - 64px - 24px)' }}>
                <Box sx={{ flex: 1, mr: 2, overflowY: 'auto', height: '100%' }}>
                    <RichTreeView
                        items={project.elements}
                        getItemLabel={getItemLabel}
                        apiRef={apiRef}
                        defaultExpandedItems={project.settings.expandedElementIds || []}
                        onExpandedItemsChange={handleExpansionChange}
                        expansionTrigger="iconContainer"
                        onItemSelectionToggle={handleItemSelectionToggle}
                        itemChildrenIndentation={24}
                    />
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
