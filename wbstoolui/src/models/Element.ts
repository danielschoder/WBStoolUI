export class Element {
    id: string;
    label: string;
    children?: Element[];

    constructor(id: string, label: string, children?: Element[]) {
        this.id = id;
        this.label = label;
        if (children) {
            this.children = children;
        }
    }
}
