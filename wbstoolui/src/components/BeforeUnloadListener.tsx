import { useEffect } from "react";
import { useCurrentProject } from "../hooks/useCurrentProject";

export const BeforeUnloadListener: React.FC = () => {
    const { project } = useCurrentProject();

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (project?.areChangesPending) {
                event.preventDefault();
                event.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [project?.areChangesPending]);

    return null;
};
