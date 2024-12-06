import { PersonDto } from "../dtos/PersonDto";
import { ProjectDto } from "../dtos/ProjectDto";
import { ProjectSettingsDto } from "../dtos/ProjectSettingsDto";
import { Element } from "./Element";

export class Project {
    id: string;
    name: string;
    persons: PersonDto[];
    rootElement: Element;
    elements: Element[];
    settings: ProjectSettingsDto;

    constructor(
        id: string,
        name: string,
        persons: PersonDto[],
        rootElement: Element,
        elements: Element[],
        settings: ProjectSettingsDto
    ) {
        this.id = id;
        this.name = name;
        this.persons = persons;
        this.rootElement = rootElement;
        this.elements = elements;
        this.settings = settings;
    }

    static ToDto(project: Project): ProjectDto {
        const rootElement = Element.ToDto(project.rootElement);
        rootElement.elements = project.rootElement.elements.map(element => Element.ToDto(element));
        return {
            id: project.id,
            name: project.name,
            rootElement: rootElement,
            settings: project.settings
        };
    }
}
