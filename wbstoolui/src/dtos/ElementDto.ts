export interface ElementDto {
    id: string; // server
    label: string; // server
    isCollapsed: boolean; // server
    elements?: ElementDto[]; // server
}
