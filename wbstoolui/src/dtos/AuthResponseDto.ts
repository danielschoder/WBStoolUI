import { UserDto } from "./UserDto";

export class AuthResponseDto {
    user: UserDto;
    errorMessage: string;

    constructor(user: UserDto, errorMessage: string) {
        this.user = user;
        this.errorMessage = errorMessage;
    }
}
