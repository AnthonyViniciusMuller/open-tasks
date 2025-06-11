export interface AuthService {
    generate(payload: Record<string, unknown>, expiresIn: number): string;
    verify(token: string): Record<string, unknown> | null;
}