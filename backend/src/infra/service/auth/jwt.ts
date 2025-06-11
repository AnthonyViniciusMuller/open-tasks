import jwt from 'jsonwebtoken';
import { AUTH_SECRET } from '../../../constants/auth';
import { AuthService } from '../../../application/service/auth';

export class JwtService implements AuthService {
    generate(payload: Record<string, unknown>, expiresIn = 1): string {
        return jwt.sign(payload, AUTH_SECRET, { expiresIn: `${expiresIn}h` });
    }

    verify(token: string): any {
        return jwt.verify(token, AUTH_SECRET);
    }
}