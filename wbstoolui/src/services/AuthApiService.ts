import axios from 'axios';
import { baseUrlAuth } from '../constants';
import { AuthResponseDto } from '../dtos/AuthResponseDto';
import { LoginDto } from '../dtos/LoginDto';
import { RegisterDto } from '../dtos/RegisterDto';

const userIdKey: string = 'userId';
const userEmailKey: string = 'userEmail';
const userNameKey: string = 'userName';
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

    public getUserId(): string | null {
        return localStorage.getItem(userIdKey);
    }

    public getUserEmail(): string | null {
        return localStorage.getItem(userEmailKey);
    }

    public getUserName(): string | null {
        return localStorage.getItem(userNameKey);
    }

    public async updateUserEmail(userId: string, newEmail: string): Promise<void> {
        const response = await axios.put(
            `${baseUrlAuth}/users`,
            { id: userId, newEmail },
            { headers: this.getAuthHeaders() }
        );

        if (response.status === 200) {
            localStorage.setItem(userEmailKey, newEmail);
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
