import { Box, Button, Container } from "@mui/material";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Error from '../components/Error';
import Loading from "../components/Loading";
import { ProjectService } from "../hooks/ProjectService";
import { ProjectDto } from "../models/ProjectDto";

const ProjectEdit = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const [project, setProject] = useState<ProjectDto | null>(null);
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
        if (!project) return;
        try {
            await projectService.updateProject(project);
        } catch {
            setError("Failed to save project.");
        }
    };

    return (
        <Container>
            <Box sx={{ mt: 2 }}>
                {project && (
                    <RichTreeView
                        items={project.elements}
                        defaultExpandedItems={project.settings.expandedElementIds || []}
                        onExpandedItemsChange={handleExpansionChange}
                        expansionTrigger="iconContainer" />
                )}
            </Box>

            <Box sx={{ mt: 2 }}>
                <Button variant="contained" color="primary" onClick={saveProject}>
                    Save
                </Button>
            </Box>
        </Container>
    );
};

export default ProjectEdit;
