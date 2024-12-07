import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useServices } from '../hooks/useServices';
import { Element } from "../models/Element";
import { Project } from "../models/Project";

interface PropertiesComponentProps {
    project: Project;
    selectedElement: Element;
    onProjectReRender: () => void;
}

const PropertiesComponent: React.FC<PropertiesComponentProps> = ({
    project, selectedElement, onProjectReRender
}) => {
    const { projectService } = useServices();

    const handleLabelChange = (newLabel: string) => {
        if (project && selectedElement) {
            selectedElement.label = newLabel;
            onProjectReRender();
        }
    };

    const handleAddChild = () => {
        if (project && selectedElement) {
            projectService.AddSubElement(selectedElement);
            onProjectReRender();
        }
    };

    const handleAddSibling = () => {
        if (project && selectedElement) {
            projectService.AddNextElement(selectedElement);
            onProjectReRender();
        }
    };

    const handleDelete = () => {
        if (project && selectedElement) {
            projectService.DeleteElement(selectedElement);
            onProjectReRender();
        }
    };

    const handleStatusChange = (newStatus: number) => {
        if (project && selectedElement) {
            selectedElement.status = newStatus;
            onProjectReRender();
        }
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

            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mt: 2 }}>
                <Button variant="contained" color="primary" sx={{ flex: 1 }} onClick={handleAddChild}>
                    Add Sub
                </Button>
                <Button variant="contained" color="primary" sx={{ flex: 1 }} disabled={!selectedElement?.parent} onClick={handleAddSibling}>
                    Add Next
                </Button>
                <Button variant="contained" color="primary" sx={{ flex: 1 }} disabled={!selectedElement?.parent} onClick={handleDelete}>
                    Delete
                </Button>
            </Box>
        </Box>
    );
};

export default PropertiesComponent;
