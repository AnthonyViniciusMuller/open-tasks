export interface AuthService {
    generate(payload: Record<string, unknown>): string;
    generateRefresh(payload: Record<string, unknown>): string;
    verify(token: string): { claims: Record<string, unknown>, error: Error | null };
}