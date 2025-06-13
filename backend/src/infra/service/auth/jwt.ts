import jwt from 'jsonwebtoken';
import { AUTH_SECRET } from '../../../constants/auth';
import { AuthService } from '../../../application/service/auth';

export class JwtService implements AuthService {
    generate(payload: Record<string, unknown>): string {
        return jwt.sign(payload, AUTH_SECRET, { expiresIn: '15m' });
    }

    generateRefresh(payload: Record<string, unknown>): string {
        return jwt.sign(payload, AUTH_SECRET, { expiresIn: '7d' });
    }

    verify(token: string) {
        try {
            return { claims: jwt.verify(token, AUTH_SECRET) as Record<string, unknown>, error: null }
        } catch (error) {
            return { claims: {}, error: error as Error }
        }
    }
}