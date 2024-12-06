import { ProjectSettingsDto } from "../dtos/ProjectSettingsDto";
import { ElementDto } from "./ElementDto";

export interface ProjectDto {
    id: string;
    name: string;
    rootElement: ElementDto;
    settings: ProjectSettingsDto;
}
