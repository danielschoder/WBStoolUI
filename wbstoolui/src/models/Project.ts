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
    areChangesPending: boolean;

    constructor(
        id: string,
        name: string,
        persons: PersonDto[],
        rootElement: Element,
        elements: Element[],
        settings: ProjectSettingsDto,
        areChangesPending: boolean
    ) {
        this.id = id;
        this.name = name;
        this.persons = persons;
        this.rootElement = rootElement;
        this.elements = elements;
        this.settings = settings;
        this.areChangesPending = areChangesPending;
        this.initializeProjectSettings();
        this.populateElements();
    }

    static fromPlainObject(data: Partial<Project>): Project {
        return new Project(
            data.id || "",
            data.name || "",
            data.persons || [],
            data.rootElement || ({} as Element),
            data.elements || [],
            data.settings || ({} as ProjectSettingsDto),
            data.areChangesPending || false
        );
    }

    initializeProjectSettings() {
        this.rootElement.number = "1";
        this.rootElement.level = 0;
    }

    populateElements() {
        this.elements = [];
        this.populateTreeAndList(this.rootElement, false);
    }

    populateTreeAndList(element: Element, parentIsCollapsed: boolean): void {
        if (!parentIsCollapsed) {
            this.elements.push(element);
        }
        if (element.elements && element.elements.length > 0) {
            Element.initNumbers(element);
            let i = 0;
            let numberOfFinished = 0;
            for (const child of element.elements) {
                Element.setTreeProperties(child, element, i);
                this.populateTreeAndList(child, parentIsCollapsed || element.isCollapsed);
                i++;
                Element.initEmptyNumbers(child);
                Element.accumulateNumbers(element, child);
                if (child.status > 0) {
                    element.status = 1;
                }
                if (child.status == 2) {
                    numberOfFinished++;
                }
            }
            if (numberOfFinished == element.elements.length) {
                element.status = 2;
            }
        }
    }

    addPerson(person: PersonDto): string | null {
        person.email = person.email.replace(/\s+/g, '').toLowerCase();
        if (this.persons.some(p => p.email === person.email)) {
            return "This email is already in the list."
        }
        person.id = crypto.randomUUID();
        this.persons.push(person);
        this.persons.sort((a, b) => a.email.localeCompare(b.email));
        this.areChangesPending = true;
        return null;
    }

    removePerson(personId: string) {
        this.persons = this.persons.filter(person => person.id !== personId);
        this.areChangesPending = true;
    }

    toDto(): ProjectDto {
        const rootElement = Element.ToDto(this.rootElement);
        if (rootElement.elements && rootElement.elements.length > 0) {
            rootElement.elements = this.rootElement.elements.map(element => Element.ToDto(element));
        }
        return {
            id: this.id,
            name: this.name,
            persons: this.persons,
            rootElement: rootElement,
            settings: this.settings
        };
    }
}
