export type ListInDto = {
    userId: string;
}

export type ListOutDto = {
    id: string;
    userId: string;
    label: string;
    description: string;
    isFinished: boolean;
    createdAt: Date;
    expiresAt: Date | null;
}[];