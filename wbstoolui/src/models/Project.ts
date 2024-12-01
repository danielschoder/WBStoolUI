import { PersonDto } from "../dtos/PersonDto";
import { ProjectDto } from "../dtos/ProjectDto";
import { ProjectSettingsDto } from "../dtos/ProjectSettingsDto";
import { Element } from "./Element";

export class Project {
    id: string;
    name: string;
    persons: PersonDto[];
    elements: Element[];
    settings: ProjectSettingsDto;

    constructor(
        id: string,
        name: string,
        persons: PersonDto[],
        elements: Element[],
        settings: ProjectSettingsDto
    ) {
        this.id = id;
        this.name = name;
        this.persons = persons;
        this.elements = elements;
        this.settings = settings;
    }

    static ToDto(project: Project): ProjectDto {
        return {
            id: project.id,
            name: project.name,
            elements: project.elements.map(element => Element.ToDto(element)),
            settings: project.settings
        };
    }
}
