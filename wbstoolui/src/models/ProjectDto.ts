import { ElementDto } from "./ElementDto";
import { PersonDto } from "./PersonDto";
import { ProjectSettingsDto } from "./ProjectSettingsDto";

export interface ProjectDto {
    id: string;
    name: string;
    persons: PersonDto[];
    elements: ElementDto[];
    settings: ProjectSettingsDto;
}
