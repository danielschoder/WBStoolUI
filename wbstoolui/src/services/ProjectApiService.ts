import axios from 'axios';
import { baseUrlWbstool } from '../constants';
import { Project } from '../models/Project';
import { ProjectService } from '../services/ProjectService';
import { AuthApiService } from './AuthApiService';

export class ProjectApiService {
    constructor(
        private projectService: ProjectService,
        private authApiService: AuthApiService
    ) { }

    async getProject(projectId: string): Promise<Project> {
        try {
            const response = await axios.get(`${baseUrlWbstool}/projects/${projectId}`, {
                headers: this.authApiService.getAuthHeaders(),
            });
            const project = response.data as Project;
            this.projectService.initializeProject(project);
            return project;
        } catch {
            throw new Error('Failed to fetch project.');
        }
    }

    async updateProject(project: Project): Promise<void> {
        try {
            await axios.put(`${baseUrlWbstool}/projects/${project.id}`, Project.ToDto(project), {
                headers: {
                    ...this.authApiService.getAuthHeaders(),
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            throw new Error('Failed to update project: ' + error);
        }
    }
}
