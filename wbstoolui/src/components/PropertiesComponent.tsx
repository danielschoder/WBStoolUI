import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { ElementDto } from "../models/ElementDto";

interface PropertiesComponentProps {
    selectedItem: ElementDto;
    onLabelChange: (newLabel: string) => void;
}

const PropertiesComponent: React.FC<PropertiesComponentProps> = ({ selectedItem, onLabelChange }) => {
    const [label, setLabel] = useState(selectedItem.label);

    useEffect(() => {
        setLabel(selectedItem.label);
    }, [selectedItem]);

    const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLabel(event.target.value);
    };

    const handleSave = () => {
        onLabelChange(label);
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
            <Box sx={{ mt: 2 }}>
                <Button variant="contained" color="primary" onClick={handleSave}>
                    Save Label
                </Button>
            </Box>
        </Box>
    );
};

export default PropertiesComponent;
