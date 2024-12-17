import React, { useMemo } from 'react';
import { AuthApiService } from './AuthApiService';
import { ProjectApiService } from './ProjectApiService';
import { ProjectService } from './ProjectService';
import { ServiceContext } from './ServiceContext';

export const ServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const services = useMemo(() => {
        const authApiService = new AuthApiService();
        const projectService = new ProjectService();
        const projectApiService = new ProjectApiService(authApiService);

        return {
            authApiService,
            projectService,
            projectApiService,
        };
    }, []);

    return <ServiceContext.Provider value={services}>{children}</ServiceContext.Provider>;
};
