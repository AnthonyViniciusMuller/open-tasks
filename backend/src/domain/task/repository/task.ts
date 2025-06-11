import { Task } from "../entity/task";

export interface TaskRepo {
    create(task: Task): Promise<void>;
}