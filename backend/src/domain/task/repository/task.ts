import { Task } from "../entity/task";

export interface TaskRepo {
    listByUserId(userId: string): Promise<Task[]>;
    getById(taskId: string): Promise<Task | null>;
    create(task: Task): Promise<void>;
    update(taskId: string, task: Omit<Task, "id" | "userId" | "createdAt">): Promise<void>;
    delete(taskId: string): Promise<void>;
}