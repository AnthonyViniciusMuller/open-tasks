import { Usecase } from "../../usecase";
import { DeleteInDto, DeleteOutDto } from "./dto";
import { TaskRepo } from "../../../../domain/task/repository/task";

export class Delete implements Usecase<DeleteInDto, DeleteOutDto> {
    constructor(private readonly taskRepo: TaskRepo) {}

    async execute(input: DeleteInDto): Promise<DeleteOutDto> {
        const task = await this.taskRepo.getById(input.id);
        if (!task) {
            throw new Error("Task not found"); 
        }

        await this.taskRepo.delete(task.id);

        return
    }
}