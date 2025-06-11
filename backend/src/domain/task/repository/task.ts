import { Task } from "../entity/task";

export interface TaskRepo {
    listByUserId(userId: string): Promise<Task[]>;
    create(task: Task): Promise<void>;
}