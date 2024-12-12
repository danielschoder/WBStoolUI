import { createContext } from "react";

export interface CurrentProjectContextProps {
    projectId: string | null;
    setProjectId: (id: string | null) => void;
}

export const CurrentProjectContext = createContext<CurrentProjectContextProps | null>(null);
