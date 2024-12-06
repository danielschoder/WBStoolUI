import { ElementDto } from "../dtos/ElementDto";

export class Element {
    id: string;
    number: string;
    label: string;
    level: number;
    index: number;
    parent?: Element;
    elements: Element[];

    constructor(
        id: string,
        number: string,
        label: string,
        level: number,
        index: number,
        parent: Element,
        children: Element[]
    ) {
        this.id = id;
        this.number = number;
        this.label = label;
        this.level = level;
        this.index = index;
        this.parent = parent;
        this.elements = children;
    }

    static ToDto(element: Element): ElementDto {
        const dto: ElementDto = {
            id: element.id,
            label: element.label
        };

        if (element.elements && element.elements.length > 0) {
            dto.elements = element.elements.map(element => Element.ToDto(element));
        }

        return dto;
    }
}
