export class UserDto {
    constructor(
        public id: string = '',
        public email: string = '',
        public name: string = '',
        public nickName: string = '',
        public jwt: string = ''
    ) { }
}
