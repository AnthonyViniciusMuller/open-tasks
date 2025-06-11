import { Usecase } from "../../usecase";
import { TaskRepo } from "../../../../domain/task/repository/task";
import { ListInDto, ListOutDto } from "./dto";

export class List implements Usecase<ListInDto, ListOutDto> {
    constructor(private readonly taskRepo: TaskRepo) {}

    async execute(input: ListInDto): Promise<ListOutDto> {
        const tasks = await this.taskRepo.listByUserId(input.userId);

        return tasks.map(task => ({
            id: task.id,
            userId: task.userId,
            label: task.label,
            description: task.description,
            isFinished: task.isFinished,
            createdAt: task.createdAt,
            expiresAt: task.expiresAt,
        }));
    }
}