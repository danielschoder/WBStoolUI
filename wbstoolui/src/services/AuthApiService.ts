import axios from 'axios';
import { baseUrlAuth } from '../constants';
import { AuthResponseDto } from '../dtos/AuthResponseDto';
import { LoginDto } from '../dtos/LoginDto';
import { RegisterDto } from '../dtos/RegisterDto';
import { UserDto } from '../dtos/UserDto';

const userIdKey: string = 'userId';
const userEmailKey: string = 'userEmail';
const userJwtKey: string = 'userJwt';

export class AuthApiService {

    async logVisitor(): Promise<void> {
        (async () => {
            try {
                await axios.post(`${baseUrlAuth}/visitors`, {});
            } catch (error) {
                console.error('Error posting visitor data', error);
            }
        })();
    }

    async login(loginDto: LoginDto): Promise<string | null> {
        try {
            const response = await fetch(`${baseUrlAuth}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginDto),
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

    async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
        try {
            const response = await fetch(`${baseUrlAuth}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerDto),
            });

            if (response.ok) {
                const authResponseDto: AuthResponseDto = await response.json();
                this.saveUserToLocalStorage(authResponseDto);
                return authResponseDto;
            } else {
                return new AuthResponseDto(new UserDto(), response.statusText);
            }
        } catch (error) {
            return new AuthResponseDto(new UserDto(), error instanceof Error ? error.message : String(error));
        }
    }

    saveUserToLocalStorage(authResponseDto: AuthResponseDto): void {
        localStorage.setItem(userIdKey, authResponseDto.user.id);
        localStorage.setItem(userEmailKey, authResponseDto.user.email);
        localStorage.setItem(userJwtKey, authResponseDto.user.jwt);
    }
    logout() {
        localStorage.removeItem(userJwtKey);
    }

    isAuthenticated(): boolean {
        const jwt = localStorage.getItem(userJwtKey);
        return !!jwt;
    }

    getUserId(): string | null {
        return localStorage.getItem(userIdKey);
    }

    getUserEmail(): string | null {
        return localStorage.getItem(userEmailKey);
    }

    getAuthHeaders(): { Authorization: string } {
        return { Authorization: `Bearer ${this.getUserJwt()}` };
    }

    getUserJwt(): string | null {
        return localStorage.getItem(userJwtKey);
    }
}
