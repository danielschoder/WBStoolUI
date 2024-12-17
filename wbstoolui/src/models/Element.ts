import { ElementDto } from "../dtos/ElementDto";

export class Element {
    id: string; // server
    number: string;
    label: string; // server
    level: number;
    index: number;
    isCollapsed: boolean; // server
    status: number; // server
    effortPlanned: number; // server
    extCostPlanned: number; // server
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
        this.status = 0;
        this.effortPlanned = 0;
        this.extCostPlanned = 0;
        this.elements = [];
    }

    static getItemLabel(element: Element) {
        return `${element.number} ${element.label}`;
    }

    static initNumbers(element: Element): void {
        element.status = 0;
        element.effortPlanned = 0;
        element.extCostPlanned = 0;
    }

    static setTreeProperties(element: Element, parent: Element, i: number): void {
        element.parent = parent;
        element.number = `${parent.number}.${i + 1}`;
        element.level = parent.level + 1;
        element.index = i;
    }

    static initEmptyNumbers(element: Element): void {
        if (!element.effortPlanned) {
            element.effortPlanned = 0;
        }
        if (!element.extCostPlanned) {
            element.extCostPlanned = 0;
        }
    }

    static accumulateNumbers(element: Element, child: Element): void {
        element.effortPlanned += child.effortPlanned;
        element.extCostPlanned += child.extCostPlanned;
    }

    static ToDto(element: Element): ElementDto {
        const dto: ElementDto = {
            id: element.id,
            label: element.label,
            isCollapsed: element.isCollapsed,
            status: element.status,
            effortPlanned: element.effortPlanned,
            extCostPlanned: element.extCostPlanned
        };

        if (element.elements && element.elements.length > 0) {
            dto.elements = element.elements.map(element => Element.ToDto(element));
        }

        return dto;
    }
}
