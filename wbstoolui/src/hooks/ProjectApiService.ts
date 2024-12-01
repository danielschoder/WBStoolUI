import axios from 'axios';
import { baseUrlWbstool } from '../constants';
import { Project } from '../models/Project';
import { ProjectService } from '../logic/ProjectService';

export class ProjectApiService {
    private projectService: ProjectService;

    constructor(projectService: ProjectService) {
        this.projectService = projectService;
    }

    async getProject(projectId: string): Promise<Project> {
        try {
            const response = await axios.get(`${baseUrlWbstool}/projects/${projectId}`, {
                headers: this.getAuthHeaders(),
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
                    ...this.getAuthHeaders(),
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            throw new Error('Failed to update project: ' + error);
        }
    }

    private getAuthHeaders(): { Authorization: string } {
        return { Authorization: `Bearer ${localStorage.getItem('jwt') }` };
    }
}
