import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Element } from "../models/Element";

interface PropertiesComponentProps {
    selectedItem: Element;
    onLabelChange: (newLabel: string) => void;
    onAddChild: () => void;
}

const PropertiesComponent: React.FC<PropertiesComponentProps> = ({ selectedItem, onLabelChange, onAddChild }) => {
    const [label, setLabel] = useState(selectedItem.label);

    useEffect(() => {
        setLabel(selectedItem.label);
    }, [selectedItem]);

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
            <Button sx={{ mb: 2 }} variant="contained" color="primary" onClick={onAddChild}>
                Add Sub
            </Button>
        </Box>
    );
};

export default PropertiesComponent;
