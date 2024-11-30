import { ElementDto } from "./ElementDto";
import { PersonDto } from "./PersonDto";

export interface ProjectDto {
    id: string;
    name: string;
    persons: PersonDto[];
    elements: ElementDto[];
}
