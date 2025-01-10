import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useServices } from '../hooks/useServices';
import { Element } from "../models/Element";
import { Project } from "../models/Project";

interface ElementPropertiesComponentProps {
    project: Project;
    selectedElement: Element;
    onProjectReRender: () => void;
}

const ElementPropertiesComponent: React.FC<ElementPropertiesComponentProps> = ({
    project, selectedElement, onProjectReRender
}) => {
    const { projectService } = useServices();

    const onProjectChanged = () => {
        project.areChangesPending = true;
        onProjectReRender();
    }

    const handleLabelChange = (newLabel: string) => {
        selectedElement.label = newLabel;
        onProjectChanged();
    };

    const handleStatusChange = (newStatus: number) => {
        selectedElement.status = newStatus;
        onProjectChanged();
    };

    const handleEffortChange = (newEffort: string) => {
        selectedElement.effortPlanned = Number(newEffort);
        onProjectChanged();
    };

    const handleExtCostChange = (newExtCost: string) => {
        selectedElement.extCostPlanned = Number(newExtCost);
        onProjectChanged();
    };

    const handleAddChild = () => {
        projectService.addSubElement(selectedElement);
        onProjectChanged();
    };

    const handleAddSibling = () => {
        projectService.addNextElement(selectedElement);
        onProjectChanged();
    };

    const handleDelete = () => {
        projectService.deleteElement(selectedElement);
        onProjectChanged();
    };

    return (
        <Box>
            <TextField
                label="Name"
                value={selectedElement.label}
                onChange={(e) => handleLabelChange(e.target.value)}
                fullWidth
                variant="outlined"
            />

            <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                    labelId="status-label"
                    value={selectedElement.status}
                    label="Status"
                    disabled={selectedElement?.elements?.length > 0}
                    onChange={(e) => handleStatusChange(e.target.value as number)}
                >
                    <MenuItem value={0}>Planned</MenuItem>
                    <MenuItem value={1}>Started</MenuItem>
                    <MenuItem value={2}>Finished</MenuItem>
                </Select>
            </FormControl>

            <TextField
                sx={{ mt: 2 }}
                label="Internal Effort"
                type="number"
                value={selectedElement.effortPlanned}
                disabled={selectedElement?.elements?.length > 0}
                onChange={(e) => handleEffortChange(e.target.value)}
                fullWidth
                variant="outlined"
            />

            <TextField
                sx={{ mt: 2 }}
                label="External Cost"
                type="number"
                value={selectedElement.extCostPlanned}
                disabled={selectedElement?.elements?.length > 0}
                onChange={(e) => handleExtCostChange(e.target.value)}
                fullWidth
                variant="outlined"
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mt: 2 }}>
                <Button variant="contained" color="primary" title="Add Sub" sx={{ flex: 1 }} onClick={handleAddChild}>
                    Add Sub
                </Button>
                <Button variant="contained" color="primary" title="Add Next" sx={{ flex: 1 }} disabled={!selectedElement?.parent} onClick={handleAddSibling}>
                    Add Next
                </Button>
                <Button variant="contained" color="primary" title="Delete" sx={{ flex: 1 }} disabled={!selectedElement?.parent} onClick={handleDelete}>
                    Delete
                </Button>
            </Box>
        </Box>
    );
};

export default ElementPropertiesComponent;
