import { createContext } from "react";
import { Project } from "../models/Project";

export interface CurrentProjectContextProps {
    project: Project | null;
    setProject: (project: Project | null) => void;
}

export const CurrentProjectContext = createContext<CurrentProjectContextProps | null>(null);
