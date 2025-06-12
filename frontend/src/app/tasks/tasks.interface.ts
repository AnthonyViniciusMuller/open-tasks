export interface Task {
    id?: string
    userId: string;
    label: string;
    description: string;
    createdAt?: Date
    expiresAt: Date | null;
}