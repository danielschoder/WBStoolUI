export class AuthResponseDto {
    jwt: string;
    errorMessage: string;

    constructor(jwt: string = '', errorMessage: string = '') {
        this.jwt = jwt;
        this.errorMessage = errorMessage;
    }
}
