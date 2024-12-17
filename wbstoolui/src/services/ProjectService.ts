import { Element } from '../models/Element';

export class ProjectService {
    public newSelectedElement: Element | null = null;

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
}
