import { ElementDto } from "../dtos/ElementDto";

export class Element {
    id: string; // server
    number: string;
    label: string; // server
    level: number;
    index: number;
    isCollapsed: boolean; // server
    parent?: Element;
    elements: Element[]; // server

    constructor(
    ) {
        this.id = crypto.randomUUID();
        this.number = "";
        this.label = "New";
        this.level = 0;
        this.index = 0;
        this.isCollapsed = false;
        this.elements = [];
    }

    static ToDto(element: Element): ElementDto {
        const dto: ElementDto = {
            id: element.id,
            isCollapsed: element.isCollapsed,
            label: element.label
        };

        if (element.elements && element.elements.length > 0) {
            dto.elements = element.elements.map(element => Element.ToDto(element));
        }

        return dto;
    }
}
