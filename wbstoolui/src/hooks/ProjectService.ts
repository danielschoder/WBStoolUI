import axios from 'axios';
import { ProjectDto } from '../models/ProjectDto';

const baseUrl = 'https://localhost:7108';

export class ProjectService {
    async getProject(projectId: string): Promise<ProjectDto> {
        try {
            const response = await axios.get(`${baseUrl}/projects/${projectId}`, {
                headers: this.getAuthHeaders(),
            });
            return response.data as ProjectDto;
        } catch (error) {
            console.error('Error retrieving project:', error);
            throw new Error('Failed to fetch project.');
        }
    }

    async getAllProjects(): Promise<ProjectDto[]> {
        try {
            const response = await axios.get(`${baseUrl}/projects`, {
                headers: this.getAuthHeaders(),
            });
            return response.data as ProjectDto[];
        } catch (error) {
            console.error('Error retrieving projects:', error);
            throw new Error('Failed to fetch projects.');
        }
    }

    private getAuthHeaders(): { Authorization: string } {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
            throw new Error('No JWT found in local storage. User is not authenticated.');
        }
        return { Authorization: `Bearer ${jwt}` };
    }
}