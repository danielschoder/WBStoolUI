import { PersonDto } from "../dtos/PersonDto";

export class Person {
    id: string;
    name: string;
    email: string;
    role: string;
    isProjectAuthor: boolean;

    constructor(
        id: string = '',
        name: string = '',
        email: string = '',
        role: string = '',
        isProjectAuthor: boolean = false
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.isProjectAuthor = isProjectAuthor;
    }

    static ToDto(person: Person): PersonDto {
        return {
            id: person.id,
            name: person.name,
            email: person.email,
            role: person.role,
            isProjectAuthor: person.isProjectAuthor
        };
    }
}
