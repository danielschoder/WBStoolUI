export interface ElementDto {
    id: string; // server
    label: string; // server
    isCollapsed: boolean; // server
    status: number; // server
    effortPlanned: number; // server
    extCostPlanned: number; // server
    elements?: ElementDto[]; // server
}
