import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Element } from "../models/Element";

interface PropertiesComponentProps {
    selectedElement: Element;
    onLabelChange: (newLabel: string) => void;
    onAddChild: () => void;
    onAddSibling: () => void;
    onDelete: () => void;
}

const PropertiesComponent: React.FC<PropertiesComponentProps> = ({
    selectedElement, onLabelChange, onAddChild, onAddSibling, onDelete
}) => {
    const [label, setLabel] = useState(selectedElement.label);

    useEffect(() => {
        setLabel(selectedElement.label);
    }, [selectedElement]);

    const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newLabel = event.target.value;
        setLabel(newLabel);
        onLabelChange(newLabel);
    };

    return (
        <Box>
            <TextField
                label="Name"
                value={label}
                onChange={handleLabelChange}
                fullWidth
                variant="outlined"
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mt: 2 }}>
                <Button variant="contained" color="primary" sx={{ flex: 1 }} onClick={onAddChild}>
                    Add Sub
                </Button>
                <Button variant="contained" color="primary" sx={{ flex: 1 }} disabled={!selectedElement?.parent} onClick={onAddSibling}>
                    Add Next
                </Button>
                <Button variant="contained" color="primary" sx={{ flex: 1 }} disabled={!selectedElement?.parent} onClick={onDelete}>
                    Delete
                </Button>
            </Box>
        </Box>
    );
};

export default PropertiesComponent;
