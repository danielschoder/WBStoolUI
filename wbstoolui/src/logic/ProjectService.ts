import { ElementDto } from '../models/ElementDto';

export class ProjectService {
    findElementById = (elements: ElementDto[], id: string): ElementDto | null => {
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
}
