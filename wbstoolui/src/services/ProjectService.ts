import { Element } from '../models/Element';
import { Project } from '../models/Project';

export class ProjectService {
    initializeProject(project: Project): void {
        this.initializeProjectSettings(project);
        this.setParentForElementsRecursive(project.elements);
    }

    findElementById = (elements: Element[], id: string): Element | null => {
        for (const element of elements) {
            if (element.id === id) {
                return element;
            }
            if (element.children) {
                const foundInChildren = this.findElementById(element.children, id);
                if (foundInChildren) {
                    return foundInChildren;
                }
            }
        }
        return null;
    };

    private setParentForElementsRecursive(elements: Element[], parent?: Element): void {
        let i = 1;
        for (const element of elements) {
            element.parent = parent;
            if (parent) {
                element.number = parent?.number + "." + i;
            }
            i++;
            if (element.children && element.children.length > 0) {
                this.setParentForElementsRecursive(element.children, element);
            }
        }
    }

    private initializeProjectSettings(project: Project): void {
        if (!project.settings) {
            project.settings = {
                expandedElementIds: [],
            };
        }
        if (!project.settings.expandedElementIds) {
            project.settings.expandedElementIds = this.getExpandedItemIds(project.elements);
        }
        project.elements[0].number = "1";
    }

    private getExpandedItemIds = (items: Element[]): string[] => {
        let ids: string[] = [];
        items.forEach((item) => {
            if (item.children && item.children.length > 0) {
                ids.push(item.id);
                ids = ids.concat(this.getExpandedItemIds(item.children));
            }
        });
        return ids;
    };
}
