export type UpdateInDto = {
    id: string;
    label: string;
    description: string;
    isFinished: boolean;
    expiresAt: Date | null;
}

export type UpdateOutDto = void;