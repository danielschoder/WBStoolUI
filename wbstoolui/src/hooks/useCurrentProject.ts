import { useContext } from "react";
import { CurrentProjectContext, CurrentProjectContextProps } from "../services/CurrentProjectContext";

export const useCurrentProject = (): CurrentProjectContextProps => {
    return useContext(CurrentProjectContext) as CurrentProjectContextProps;
};
