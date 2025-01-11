export class UserDto {
    constructor(
        public email: string = '',
        public name: string = '',
        public nickName: string = '',
        public jwt: string = ''
    ) { }
}
