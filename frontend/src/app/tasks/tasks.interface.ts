export type Task = {
    id?: string
    userId: string;
    label: string;
    description: string;
    isFinished: boolean;
    createdAt?: Date
    expiresAt: Date | null;
}

export type TaskForm = Omit<Task, 'id' | 'userId' | 'createdAt' | 'isFinished'>;