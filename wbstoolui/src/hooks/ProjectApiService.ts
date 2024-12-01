import axios from 'axios';
import { baseUrlWbstool } from '../constants';
import { ElementDto } from '../models/ElementDto';
import { ProjectDto } from '../models/ProjectDto';

export class ProjectApiService {
    async getProject(projectId: string): Promise<ProjectDto> {
        try {
            const response = await axios.get(`${baseUrlWbstool}/projects/${projectId}`, {
                headers: this.getAuthHeaders(),
            });
            const project = response.data as ProjectDto;
            this.initializeProjectSettings(project);
            return project;
        } catch {
            throw new Error('Failed to fetch project.');
        }
    }

    async updateProject(project: ProjectDto): Promise<void> {
        try {
            await axios.put(`${baseUrlWbstool}/projects/${project.id}`, project, {
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
        return { Authorization: `Bearer ${localStorage.getItem('jwt') }` };
    }
}
