import axios from 'axios';
import { baseUrlWbstool } from '../constants';
import { Project } from '../models/Project';
import { ProjectService } from '../services/ProjectService';
import { AuthApiService } from './AuthApiService';
import { Person } from '../models/Person';

export class ProjectApiService {
    constructor(
        private projectService: ProjectService,
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
            return response.data as Project;
        } catch (error) {
            throw new Error('Failed to create project: ' + error);
        }
    }

    async getProject(projectId: string): Promise<Project> {
        try {
            const response = await axios.get(`${baseUrlWbstool}/projects/${projectId}`, {
                headers: this.authApiService.getAuthHeaders(),
            });
            const project = response.data as Project;
            this.projectService.initializeProject(project);
            return project;
        } catch (error) {
            throw new Error('Failed to fetch project: ' + error);
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

    async deleteProject(projectId: string): Promise<void> {
        try {
            await axios.delete(`${baseUrlWbstool}/projects/${projectId}`, {
                headers: this.authApiService.getAuthHeaders(),
            });
        } catch (error) {
            throw new Error('Failed to delete project: ' + error);
        }
    }

    async addPerson(projectId: string): Promise<Person> {
        try {
            const response = await axios.post(`${baseUrlWbstool}/projects/${projectId}/persons`, null, {
                headers: {
                    ...this.authApiService.getAuthHeaders(),
                    'Content-Type': 'application/json',
                },
            });
            return response.data as Person;
        } catch (error) {
            throw new Error('Failed to add person: ' + error);
        }
    }

    async removePerson(projectId: string, personId: string): Promise<void> {
        try {
            await axios.delete(`${baseUrlWbstool}/projects/${projectId}/persons/${personId}`, {
                headers: this.authApiService.getAuthHeaders(),
            });
        } catch (error) {
            throw new Error('Failed to delete person: ' + error);
        }
    }
}
