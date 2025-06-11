import { randomUUID } from "crypto";

interface TaskProps {
    id?: string;
    userId: string;
    label: string;
    description: string;
    isFinished?: boolean;
    createdAt?: Date;
    expiresAt: Date | null;
}

export class Task {
    public readonly id: string;
    public userId: string;
    public label: string;
    public description: string;
    public isFinished: boolean;
    public createdAt: Date;
    public expiresAt: Date | null;

    constructor(task: TaskProps) {
        this.id = task.id ?? randomUUID().toString();
        this.userId = task.userId;
        this.label = task.label;
        this.description = task.description;
        this.isFinished = !!task.isFinished;
        this.createdAt = task.createdAt || new Date();
        this.expiresAt = task.expiresAt;
    }
}
