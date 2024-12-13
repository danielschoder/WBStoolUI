import { Box, TextField } from "@mui/material";
//import { useServices } from '../hooks/useServices';
import { Person } from "../models/Person";
import { Project } from "../models/Project";

interface PersonPropertiesComponentProps {
    project: Project;
    selectedPerson: Person;
    onProjectReRender: () => void;
}

const PersonPropertiesComponent: React.FC<PersonPropertiesComponentProps> = ({
    project, selectedPerson, onProjectReRender
}) => {
    //const { projectService } = useServices();

    const handleRoleChange = (newRole: string) => {
        if (project && selectedPerson) {
            selectedPerson.role = newRole;
            onProjectReRender();
        }
    };

    //const handleEffortChange = (newEffort: string) => {
    //    if (project && selectedPerson) {
    //        selectedPerson.effortPlanned = Number(newEffort);
    //        onProjectReRender();
    //    }
    //};

    //const handleExtCostChange = (newExtCost: string) => {
    //    if (project && selectedPerson) {
    //        selectedPerson.extCostPlanned = Number(newExtCost);
    //        onProjectReRender();
    //    }
    //};

    //const handleAddChild = () => {
    //    if (project && selectedPerson) {
    //        projectService.addSubElement(selectedPerson);
    //        onProjectReRender();
    //    }
    //};

    //const handleAddSibling = () => {
    //    if (project && selectedPerson) {
    //        projectService.addNextElement(selectedPerson);
    //        onProjectReRender();
    //    }
    //};

    //const handleDelete = () => {
    //    if (project && selectedPerson) {
    //        projectService.deleteElement(selectedPerson);
    //        onProjectReRender();
    //    }
    //};

    //const handleStatusChange = (newStatus: number) => {
    //    if (project && selectedPerson) {
    //        selectedPerson.status = newStatus;
    //        onProjectReRender();
    //    }
    //};

    return (
        <Box>
            <TextField
                label="Role"
                value={selectedPerson.role}
                onChange={(e) => handleRoleChange(e.target.value)}
                fullWidth
                variant="outlined"
            />

            {/*<FormControl fullWidth sx={{ mt: 2 }}>*/}
            {/*    <InputLabel id="status-label">Status</InputLabel>*/}
            {/*    <Select*/}
            {/*        labelId="status-label"*/}
            {/*        value={selectedPerson.status}*/}
            {/*        label="Status"*/}
            {/*        disabled={selectedPerson?.elements?.length > 0}*/}
            {/*        onChange={(e) => handleStatusChange(e.target.value as number)}*/}
            {/*    >*/}
            {/*        <MenuItem value={0}>Planned</MenuItem>*/}
            {/*        <MenuItem value={1}>Started</MenuItem>*/}
            {/*        <MenuItem value={2}>Finished</MenuItem>*/}
            {/*    </Select>*/}
            {/*</FormControl>*/}

            {/*<TextField*/}
            {/*    sx={{ mt: 2 }}*/}
            {/*    label="Internal Effort"*/}
            {/*    type="number"*/}
            {/*    value={selectedPerson.effortPlanned}*/}
            {/*    disabled={selectedPerson?.elements?.length > 0}*/}
            {/*    onChange={(e) => handleEffortChange(e.target.value)}*/}
            {/*    fullWidth*/}
            {/*    variant="outlined"*/}
            {/*/>*/}

            {/*<TextField*/}
            {/*    sx={{ mt: 2 }}*/}
            {/*    label="External Cost"*/}
            {/*    type="number"*/}
            {/*    value={selectedPerson.extCostPlanned}*/}
            {/*    disabled={selectedPerson?.elements?.length > 0}*/}
            {/*    onChange={(e) => handleExtCostChange(e.target.value)}*/}
            {/*    fullWidth*/}
            {/*    variant="outlined"*/}
            {/*/>*/}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mt: 2 }}>
                {/*<Button variant="contained" color="primary" sx={{ flex: 1 }} onClick={handleAddChild}>*/}
                {/*    Add Sub*/}
                {/*</Button>*/}
                {/*<Button variant="contained" color="primary" sx={{ flex: 1 }} disabled={!selectedPerson?.parent} onClick={handleAddSibling}>*/}
                {/*    Add Next*/}
                {/*</Button>*/}
            {/*    <Button variant="contained" color="primary" sx={{ flex: 1 }} disabled={!selectedPerson} onClick={handleDelete}>*/}
            {/*        Delete*/}
            {/*    </Button>*/}
            </Box>
        </Box>
    );
};

export default PersonPropertiesComponent;
