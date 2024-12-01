import { Box, TextField } from "@mui/material";
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
        </Box>
    );
};

export default PropertiesComponent;
