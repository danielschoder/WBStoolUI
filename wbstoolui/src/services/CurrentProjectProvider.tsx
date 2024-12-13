import { useState } from "react";
import { Project } from "../models/Project";
import { CurrentProjectContext } from "./CurrentProjectContext";

export const CurrentProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [project, setProject] = useState<Project | null>(null);
    return (
        <CurrentProjectContext.Provider value={{ project, setProject }}>
            {children}
        </CurrentProjectContext.Provider>
    );
};
