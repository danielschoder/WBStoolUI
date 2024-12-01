import { Box, Button, Container } from "@mui/material";
import { useTreeViewApiRef } from "@mui/x-tree-view/hooks/useTreeViewApiRef";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Error from '../components/Error';
import Loading from "../components/Loading";
import PropertiesComponent from "../components/PropertiesComponent";
import { ProjectApiService } from "../hooks/ProjectApiService";
import { ProjectService } from "../logic/ProjectService";
import { ElementDto } from "../models/ElementDto";
import { ProjectDto } from "../models/ProjectDto";
import SaveIcon from '@mui/icons-material/Save';

const ProjectEdit = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const [project, setProject] = useState<ProjectDto | null>(null);
    const [selectedItem, setSelectedItem] = useState<ElementDto | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const projectApiService = useMemo(() => new ProjectApiService(), []);
    const projectService = useMemo(() => new ProjectService(), []);
    const apiRef = useTreeViewApiRef();

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

    const saveProject = async () => {
        if (project && apiRef.current) {
            await projectApiService.updateProject(project);
        }
    };

    const handleItemSelectionToggle = (_event: React.SyntheticEvent, itemId: string, isSelected: boolean) => {
        if (project && isSelected) {
            setSelectedItem(projectService.findElementById(project.elements, itemId));
        }
    };

    const handleLabelChange = (newLabel: string) => {
        if (project && selectedItem) {
            selectedItem.label = newLabel;
            if (apiRef.current) {
                apiRef.current.updateItemLabel(selectedItem.id, selectedItem.label);
            }
        }
    };

    if (loading) { return <Loading />; }
    if (error) { return <Error error={error} />; }
    if (project) {
        return <Container>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, height: 'calc(100vh - 64px - 24px)' }}>
                <Box sx={{ flex: 1, mr: 2, overflowY: 'auto', height: '100%' }}>
                    <RichTreeView
                        items={project.elements}
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
        </Container>;
    }
};

export default ProjectEdit;
