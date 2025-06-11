import { UserRepo } from "../../../../domain/user/repository/user";
import { Usecase } from "../../usecase";
import { CreateInDto, CreateOutDto } from "./dto";
import { TaskRepo } from "../../../../domain/task/repository/task";
import { Task } from "../../../../domain/task/entity/task";

export class Create implements Usecase<CreateInDto, CreateOutDto> {
    constructor(
        private readonly userRepo: UserRepo,
        private readonly taskRepo: TaskRepo,
    ) {}

    async execute(input: CreateInDto): Promise<CreateOutDto> {
        const user = await this.userRepo.getById(input.userId);
        if (!user) {
            throw new Error("User not found"); 
        }

        const task = new Task(input);

        await this.taskRepo.create(task);

        return { id: task.id }
    }
}