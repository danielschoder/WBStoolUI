export interface ElementDto {
    id: string;
    label: string;
    children?: ElementDto[];
}
