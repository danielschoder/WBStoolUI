import axios from 'axios';
import { baseUrlWbstool } from '../constants';
import { Project } from '../models/Project';
import { AuthApiService } from './AuthApiService';
import { PersonDto } from '../dtos/PersonDto';

export class ProjectApiService {
    constructor(
        private authApiService: AuthApiService
    ) { }

    async createProject(): Promise<Project> {
        try {
            const response = await axios.post(`${baseUrlWbstool}/projects`, null, {
                headers: {
                    ...this.authApiService.getAuthHeaders(),
                    'Content-Type': 'application/json',
                },
            });
            return Project.fromPlainObject(response.data as Project);
        } catch (error) {
            throw new Error('Failed to create project: ' + error);
        }
    }

    async getProject(projectId: string): Promise<Project> {
        try {
            const response = await axios.get(`${baseUrlWbstool}/projects/${projectId}`, {
                headers: this.authApiService.getAuthHeaders(),
            });
            return Project.fromPlainObject(response.data as Project);
        } catch (error) {
            throw new Error('Failed to fetch project: ' + error);
        }
    }

    async updateProject(project: Project): Promise<void> {
        try {
            const response = await axios.put(`${baseUrlWbstool}/projects/${project.id}`, project.toDto(), {
                headers: {
                    ...this.authApiService.getAuthHeaders(),
                    'Content-Type': 'application/json',
                }
            });
            project.persons = response.data as PersonDto[];
            project.areChangesPending = false;
        } catch (error) {
            throw new Error('Failed to update project: ' + error);
        }
    }

    async deleteProject(projectId: string): Promise<void> {
        try {
            await axios.delete(`${baseUrlWbstool}/projects/${projectId}`, {
                headers: this.authApiService.getAuthHeaders(),
            });
        } catch (error) {
            throw new Error('Failed to delete project: ' + error);
        }
    }
}
