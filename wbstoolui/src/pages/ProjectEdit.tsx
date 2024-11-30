import { Box, Container } from "@mui/material";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Error from '../components/Error';
import Loading from "../components/Loading";
import { ProjectService } from "../hooks/ProjectService";
import { ElementDto } from "../models/ElementDto";
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
            } catch (err) {
                setError("Failed to fetch project.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [projectService, projectId]);

    if (loading) { return <Loading />; }
    if (error) { return <Error error={error} />; }

    const getExpandedItemIds = (items: ElementDto[]): string[] => {
        let ids: string[] = [];
        items.forEach((item) => {
            if (item.children && item.children.length > 0) {
                ids.push(item.id);
                ids = ids.concat(getExpandedItemIds(item.children));
            }
        });
        return ids;
    };
    const expandedItemIds = project ? getExpandedItemIds(project.elements) : [];

    return (
        <Container>
            <Box sx={{ marginTop: 2 }}>
                {project && (
                    <RichTreeView items={project.elements} defaultExpandedItems={expandedItemIds} expansionTrigger="iconContainer" />
                )}
            </Box>
        </Container>
    );
};

export default ProjectEdit;
