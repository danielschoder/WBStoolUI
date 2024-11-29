import { Box, Container } from "@mui/material";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { Element } from '../models/Element';

const ProjectEdit = () => {
    const project: Element[] = [
        new Element("1", "Project", [
            new Element("2", "Phase 1", [
                new Element("3", "Task 1.1"),
                new Element("4", "Task 1.2"),
            ]),
            new Element("5", "Phase 2", [
                new Element("6", "Task 2.1"),
                new Element("7", "Task 2.2"),
            ]),        ]),
    ];

    const getExpandedItemIds = (items: Element[]): string[] => {
        let ids: string[] = [];
        items.forEach(item => {
            if (item.children && item.children.length > 0) {
                ids.push(item.id);
                ids = ids.concat(getExpandedItemIds(item.children));
            }
        });
        return ids;
    };

    const expandedItemIds = getExpandedItemIds(project);

    return (
        <Container>
            <Box sx={{ marginTop: 2 }}>
                <RichTreeView items={project} expandedItems={expandedItemIds} expansionTrigger="iconContainer" />
            </Box>
        </Container>
    );
};

export default ProjectEdit;
