import axios from 'axios';
import { ProjectDto } from '../models/ProjectDto';
import { ElementDto } from '../models/ElementDto';

const baseUrl = 'https://localhost:7108';

export class ProjectService {
    async getProject(projectId: string): Promise<ProjectDto> {
        try {
            const response = await axios.get(`${baseUrl}/projects/${projectId}`, {
                headers: this.getAuthHeaders(),
            });
            const project = response.data as ProjectDto;
            this.initializeProjectSettings(project);
            return project;
        } catch {
            throw new Error('Failed to fetch project.');
        }
    }

    async getAllProjects(): Promise<ProjectDto[]> {
        try {
            const response = await axios.get(`${baseUrl}/projects`, {
                headers: this.getAuthHeaders(),
            });
            return response.data as ProjectDto[];
        } catch {
            throw new Error('Failed to fetch projects.');
        }
    }

    async updateProject(project: ProjectDto): Promise<void> {
        try {
            await axios.put(`${baseUrl}/projects/${project.id}`, project, {
                headers: {
                    ...this.getAuthHeaders(),
                    'Content-Type': 'application/json',
                },
            });
        } catch {
            throw new Error('Failed to update project.');
        }
    }

    private initializeProjectSettings(project: ProjectDto): void {
        if (!project.settings) {
            project.settings = {
                expandedElementIds: [],
            };
        }
        if (!project.settings.expandedElementIds) {
            project.settings.expandedElementIds = this.getExpandedItemIds(project.elements);
        }
    }

    private getExpandedItemIds = (items: ElementDto[]): string[] => {
        let ids: string[] = [];
        items.forEach((item) => {
            if (item.children && item.children.length > 0) {
                ids.push(item.id);
                ids = ids.concat(this.getExpandedItemIds(item.children));
            }
        });
        return ids;
    };

    private getAuthHeaders(): { Authorization: string } {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
            throw new Error('No JWT found in local storage. User is not authenticated.');
        }
        return { Authorization: `Bearer ${jwt}` };
    }
}
