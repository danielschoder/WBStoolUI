import { Element } from '../models/Element';
import { Project } from '../models/Project';

export class ProjectService {
    initializeProject(project: Project): void {
        this.initializeProjectSettings(project);
        this.populateElements(project);
    }

    getItemLabel(item: Element) {
        return `${item.number} ${item.label}`;
    }

    populateElements(project: Project) {
        project.elements = [];
        this.populateTreeAndList(project, project.rootElement);
    }

    private populateTreeAndList(project: Project, element: Element): void {
        let i = 0;
        project.elements.push(element);
        if (element.elements && element.elements.length > 0) {
            for (const child of element.elements) {
                child.parent = element;
                child.number = `${element.number}.${i + 1}`;
                child.level = element.level + 1;
                child.index = i;
                this.populateTreeAndList(project, child);
                i++;
            }
        }
    }

    private initializeProjectSettings(project: Project): void {
        project.rootElement.number = "1";
        project.rootElement.level = 0;
    }
}
