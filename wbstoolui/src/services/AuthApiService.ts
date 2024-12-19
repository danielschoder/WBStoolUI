import axios from 'axios';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { baseUrlAuth } from '../constants';
import { AuthResponseDto } from '../dtos/AuthResponseDto';
import { LoginDto } from '../dtos/LoginDto';
import { RegisterDto } from '../dtos/RegisterDto';

interface CustomJwtPayload extends JwtPayload {
    sub?: string;
    email?: string;
}

export class AuthApiService {
    async logVisitor(): Promise<void> {
        (async () => {
            try {
                await axios.post(`${baseUrlAuth}/api/visitors`, {});
            } catch (error) {
                console.error('Error posting visitor data', error);
            }
        })();
    }

    async login(loginDto: LoginDto): Promise<AuthResponseDto> {
        try {
            const response = await fetch(`${baseUrlAuth}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginDto),
            });

            if (response.ok) {
                const authResponseDto: AuthResponseDto = await response.json();
                localStorage.setItem('jwt', authResponseDto.jwt);
                return authResponseDto;
            } else if (response.status === 401) {
                return new AuthResponseDto('', 'Email/password invalid.');
            } else {
                return new AuthResponseDto('', response.statusText);
            }
        } catch (error) {
            return new AuthResponseDto('', error instanceof Error ? error.message : String(error));
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
                localStorage.setItem('jwt', authResponseDto.jwt);
                return authResponseDto;
            } else {
                return new AuthResponseDto('', response.statusText);
            }
        } catch (error) {
            return new AuthResponseDto('', error instanceof Error ? error.message : String(error));
        }
    }

    logout() {
        localStorage.removeItem('jwt');
    }

    isAuthenticated(): boolean {
        const jwt = localStorage.getItem('jwt');
        return !!jwt;
    }

    getUserId(): string | null {
        const decoded = this.getDecodedJwt();
        return decoded?.sub || null;
    }

    getUserName(): string | null {
        //const decoded = this.getDecodedJwt();
        return '"My Name"';
    }

    getUserEmail(): string | null {
        const decoded = this.getDecodedJwt();
        return decoded?.email || null;
    }

    getDecodedJwt(): CustomJwtPayload | null {
        const jwt = this.getLocalJwt();
        if (!jwt) {
            return null;
        }
        try {
            const decodedToken = jwtDecode<CustomJwtPayload>(jwt);
            return decodedToken;
        } catch (error) {
            console.error('Failed to decode JWT:', error);
            return null;
        }
    }

    getAuthHeaders(): { Authorization: string } {
        return { Authorization: `Bearer ${this.getLocalJwt()}` };
    }

    getLocalJwt(): string | null {
        return localStorage.getItem('jwt');
    }
}
