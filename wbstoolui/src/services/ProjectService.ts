import { Element } from '../models/Element';
import { Project } from '../models/Project';

export class ProjectService {
    public newSelectedElement: Element | null = null;

    initializeProject(project: Project): void {
        this.initializeProjectSettings(project);
        this.populateElements(project);
    }

    populateElements(project: Project) {
        project.elements = [];
        this.populateTreeAndList(project, project.rootElement, false);
    }

    getItemLabel(element: Element) {
        return `${element.number} ${element.label}`;
    }

    addSubElement(element: Element) {
        if (!element.elements) {
            element.elements = [];
        }
        element.isCollapsed = false;
        element.elements.push(new Element());
    }

    addNextElement(element: Element) {
        const parent = element.parent;
        if (parent) {
            parent.isCollapsed = false;
            parent.elements.splice(element.index + 1, 0, new Element())
        }
    }

    deleteElement(element: Element) {
        const parent = element.parent;
        if (parent) {
            parent.elements.splice(element.index, 1)
            this.newSelectedElement = parent.elements.length == 0 ? parent
                : parent.elements[element.index - (element.index >= parent.elements.length ? 1 : 0)];
        }
    }

    removePerson(project: Project, personId: string) {
        if (project && project.persons) {
            project.persons = project.persons.filter(person => person.id !== personId);
        }
    }

    private populateTreeAndList(project: Project, element: Element, parentIsCollapsed: boolean): void {
        if (!parentIsCollapsed) {
            project.elements.push(element);
        }
        if (element.elements && element.elements.length > 0) {
            Element.initNumbers(element);
            let i = 0;
            let numberOfFinished = 0;
            for (const child of element.elements) {
                Element.setTreeProperties(child, element, i);
                this.populateTreeAndList(project, child, parentIsCollapsed || element.isCollapsed);
                i++;
                Element.initEmptyNumbers(child);
                Element.accumulateNumbers(element, child);
                if (child.status > 0) {
                    element.status = 1;
                }
                if (child.status == 2) {
                    numberOfFinished++;
                }
            }
            if (numberOfFinished == element.elements.length) {
                element.status = 2;
            }
        }
    }

    private initializeProjectSettings(project: Project): void {
        project.rootElement.number = "1";
        project.rootElement.level = 0;
    }
}
