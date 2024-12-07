import { Element } from '../models/Element';
import { Project } from '../models/Project';

export class ProjectService {
    initializeProject(project: Project): void {
        this.initializeProjectSettings(project);
        this.populateElements(project);
    }

    getItemLabel(element: Element) {
        return `${element.number} ${element.label}`;
    }

    populateElements(project: Project) {
        project.elements = [];
        this.populateTreeAndList(project, project.rootElement, false);
    }

    AddSubElement(element: Element) {
        if (!element.elements) {
            element.elements = [];
        }
        element.isCollapsed = false;
        element.elements.push(new Element());
    }

    AddNextElement(element: Element) {
        const parent = element.parent;
        if (parent) {
            parent.isCollapsed = false;
            parent.elements.splice(element.index + 1, 0, new Element())
        }
    }

    DeleteElement(element: Element) {
        const parent = element.parent;
        if (parent) {
            parent.elements.splice(element.index, 1)
        }
    }

    private populateTreeAndList(project: Project, element: Element, parentIsCollapsed: boolean): void {
        let i = 0;
        if (!parentIsCollapsed) {
            project.elements.push(element);
        }
        if (element.elements && element.elements.length > 0) {
            for (const child of element.elements) {
                child.parent = element;
                child.number = `${element.number}.${i + 1}`;
                child.level = element.level + 1;
                child.index = i;
                this.populateTreeAndList(project, child, parentIsCollapsed || element.isCollapsed);
                i++;
            }
        }
    }

    private initializeProjectSettings(project: Project): void {
        project.rootElement.number = "1";
        project.rootElement.level = 0;
    }
}
