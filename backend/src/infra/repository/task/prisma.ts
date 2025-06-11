import { PrismaClient } from "@prisma/client";
import { Task } from "../../../domain/task/entity/task";
import { TaskRepo } from "../../../domain/task/repository/task";

export class PrismaTaskRepo implements TaskRepo {
  constructor(private readonly prismaClient: PrismaClient) {}

  async create(task: Task): Promise<void> {
    await this.prismaClient.task.create({
      data: task
    });
  }
}
