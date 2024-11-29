import axios from 'axios';
import { LoginDto } from '../dtos/LoginDto';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { AuthResponseDto } from '../dtos/AuthResponseDto';
import { RegisterDto } from '../dtos/RegisterDto';

const baseUrl = 'https://schoderauth.azurewebsites.net';

interface CustomJwtPayload extends JwtPayload {
    sub?: string;
    email?: string;
}
export class AuthService {

    async logVisitor(): Promise<void> {
        (async () => {
            try {
                await axios.post(`${baseUrl}/api/visitors`, {});
            } catch (error) {
                console.error('Error posting visitor data', error);
            }
        })();
    }

    async login(loginDto: LoginDto): Promise<AuthResponseDto> {
        try {
            const response = await fetch(`${baseUrl}/api/login`, {
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
            const response = await fetch(`${baseUrl}/api/register`, {
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

    isAuthenticated(): boolean {
        const jwt = localStorage.getItem('jwt');
        return !!jwt;
    }

    logout() {
        localStorage.removeItem('jwt');
    }

    getUserId(): string | null {
        const decoded = this.getDecodedJwt();
        return decoded?.sub || null;
    }

    getUserEmail(): string | null {
        const decoded = this.getDecodedJwt();
        return decoded?.email || null;
    }

    getDecodedJwt(): CustomJwtPayload | null {
        const jwt = localStorage.getItem('jwt');
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
}
