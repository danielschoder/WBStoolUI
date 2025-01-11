export class UserUpdateDto {
    email: string;
    name: string;
    nickName: string;

    constructor(email: string, name: string, nickName: string) {
        this.email = email;
        this.name = name;
        this.nickName = nickName;
    }
}
