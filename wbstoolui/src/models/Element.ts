import { ElementDto } from "../dtos/ElementDto";

export class Element {
    id: string;
    number: string;
    label: string;
    parent?: Element;
    children: Element[];

    constructor(
        id: string,
        number: string,
        label: string,
        parent: Element,
        children: Element[]
    ) {
        this.id = id;
        this.number = number;
        this.label = label;
        this.parent = parent;
        this.children = children;
    }

    static ToDto(element: Element): ElementDto {
        const dto: ElementDto = {
            id: element.id,
            label: element.label
        };

        if (element.children && element.children.length > 0) {
            dto.children = element.children.map(child => Element.ToDto(child));
        }

        return dto;
    }
}
