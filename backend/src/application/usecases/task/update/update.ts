import { Usecase } from "../../usecase";
import { TaskRepo } from "../../../../domain/task/repository/task";
import { UpdateInDto, UpdateOutDto } from "./dto";

export class Update implements Usecase<UpdateInDto, UpdateOutDto> {
    constructor(private readonly taskRepo: TaskRepo) {}

    async execute(input: UpdateInDto): Promise<UpdateOutDto> {
        const task = await this.taskRepo.getById(input.id);
        if (!task) {
            throw new Error("Task not found"); 
        }

        await this.taskRepo.update(task.id, {
            label: input.label,
            description: input.description,
            isFinished: input.isFinished,
            expiresAt: input.expiresAt || null,
        });

        return
    }
}