import axios from 'axios';
import { baseUrlAuth } from '../constants';
import { AuthResponseDto } from '../dtos/AuthResponseDto';
import { LoginDto } from '../dtos/LoginDto';
import { RegisterDto } from '../dtos/RegisterDto';
import { UserUpdateDto } from '../dtos/UserUpdateDto';
import { UserDto } from '../dtos/UserDto';

const userIdKey: string = 'userId';
const userEmailKey: string = 'userEmail';
const userNameKey: string = 'userName';
const userNickNameKey: string = 'userNickName';
const userJwtKey: string = 'userJwt';

export class AuthApiService {

    public async logVisitor(): Promise<void> {
        (async () => {
            try {
                await axios.post(`${baseUrlAuth}/visitors`, {});
            } catch (error) {
                console.error('Error posting visitor data', error);
            }
        })();
    }

    public async login(loginDto: LoginDto): Promise<string | null> {
        return this.sendAuthRequest(`${baseUrlAuth}/users/login`, loginDto);
    }

    public async register(registerDto: RegisterDto): Promise<string | null> {
        return this.sendAuthRequest(`${baseUrlAuth}/users`, registerDto);
    }

    public logout() {
        localStorage.removeItem(userJwtKey);
    }

    public getAuthHeaders(): { Authorization: string } {
        return { Authorization: `Bearer ${this.getUserJwt()}` };
    }

    public isAuthenticated(): boolean {
        const jwt = localStorage.getItem(userJwtKey);
        return !!jwt;
    }

    public getUser(): UserDto {
        const id = localStorage.getItem(userIdKey);
        const email = localStorage.getItem(userEmailKey);
        const name = localStorage.getItem(userNameKey);
        const nickName = localStorage.getItem(userNickNameKey);
        return new UserDto(id || '', email || '', name || '', nickName || '');
    }

    public getUserId(): string | null {
        return localStorage.getItem(userIdKey);
    }

    public getUserEmail(): string | null {
        return localStorage.getItem(userEmailKey);
    }

    public getUserName(): string | null {
        return localStorage.getItem(userNameKey);
    }

    public getUserNickName(): string | null {
        return localStorage.getItem(userNickNameKey);
    }

    public async updateUser(userUpdateDto: UserUpdateDto): Promise<void> {
        const response = await axios.put(
            `${baseUrlAuth}/users`,
            userUpdateDto,
            { headers: this.getAuthHeaders() }
        );

        if (response.status === 200) {
            localStorage.setItem(userEmailKey, userUpdateDto.email);
            localStorage.setItem(userNameKey, userUpdateDto.name);
            localStorage.setItem(userNickNameKey, userUpdateDto.nickName);
        }
        else {
            throw `${baseUrlAuth}/users error: ${response.status}`
        }
    }

    private saveUserToLocalStorage(authResponseDto: AuthResponseDto): void {
        localStorage.setItem(userIdKey, authResponseDto.user.id);
        localStorage.setItem(userEmailKey, authResponseDto.user.email);
        localStorage.setItem(userNameKey, authResponseDto.user.name);
        localStorage.setItem(userJwtKey, authResponseDto.user.jwt);
    }

    private getUserJwt(): string | null {
        return localStorage.getItem(userJwtKey);
    }

    private async sendAuthRequest<T>(
        endpoint: string,
        payload: T
    ): Promise<string | null> {
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const authResponseDto: AuthResponseDto = await response.json();
                if (authResponseDto.errorMessage) {
                    return authResponseDto.errorMessage;
                }
                this.saveUserToLocalStorage(authResponseDto);
                return null;
            } else if (response.status === 401) {
                return 'Email/password invalid.';
            } else {
                return response.statusText;
            }
        } catch (error) {
            return error instanceof Error ? error.message : String(error);
        }
    }
}
