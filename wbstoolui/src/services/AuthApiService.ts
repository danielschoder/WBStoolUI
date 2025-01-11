import axios from 'axios';
import { baseUrlAuth } from '../constants';
import { AuthResponseDto } from '../dtos/AuthResponseDto';
import { LoginDto } from '../dtos/LoginDto';
import { RegisterDto } from '../dtos/RegisterDto';
import { UserDto } from '../dtos/UserDto';

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
        const email = localStorage.getItem(userEmailKey);
        const name = localStorage.getItem(userNameKey);
        const nickName = localStorage.getItem(userNickNameKey);
        return new UserDto(email || '', name || '', nickName || '');
    }

    public getUserEmail(): string | null {
        return localStorage.getItem(userEmailKey);
    }

    public async updateUser(userDto: UserDto): Promise<void> {
        const response = await axios.put(
            `${baseUrlAuth}/users`,
            userDto,
            { headers: this.getAuthHeaders() }
        );

        if (response.status === 200) {
            this.saveUserDataToLocalStorage(userDto);
        }
        else {
            throw `${baseUrlAuth}/users error: ${response.status}`
        }
    }

    private saveAuthToLocalStorage(userDto: UserDto): void {
        localStorage.setItem(userJwtKey, userDto.jwt);
        this.saveUserDataToLocalStorage(userDto);
    }

    private saveUserDataToLocalStorage(userDto: UserDto): void {
        localStorage.setItem(userEmailKey, userDto.email);
        localStorage.setItem(userNameKey, userDto.name);
        localStorage.setItem(userNickNameKey, userDto.nickName);
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
                this.saveAuthToLocalStorage(authResponseDto.user);
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
