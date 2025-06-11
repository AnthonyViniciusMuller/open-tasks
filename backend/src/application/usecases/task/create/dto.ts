export type CreateInDto = {
    userId: string;
    label: string;
    description: string;
    expiresAt: Date | null;
}

export type CreateOutDto = {
    id: string;
};