import { useState } from "react";
import { CurrentProjectContext } from "./CurrentProjectContext";

export const CurrentProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [projectId, setProjectId] = useState<string | null>(null);
    return (
        <CurrentProjectContext.Provider value={{ projectId, setProjectId }}>
            {children}
        </CurrentProjectContext.Provider>
    );
};
