import { createContext } from 'react';
import { AuthApiService } from './AuthApiService';
import { ProjectApiService } from './ProjectApiService';
import { ProjectService } from './ProjectService';

export interface ServiceContainer {
    authApiService: AuthApiService;
    projectService: ProjectService;
    projectApiService: ProjectApiService;
}

export const ServiceContext = createContext<ServiceContainer | null>(null);
