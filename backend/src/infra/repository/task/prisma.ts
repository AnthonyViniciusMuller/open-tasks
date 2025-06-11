import { PrismaClient } from "@prisma/client";
import { Task } from "../../../domain/task/entity/task";
import { TaskRepo } from "../../../domain/task/repository/task";

export class PrismaTaskRepo implements TaskRepo {
  constructor(private readonly prismaClient: PrismaClient) {}

  async listByUserId(userId: string): Promise<Task[]> {
    return await this.prismaClient.task.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }
    });
  }


  async create(task: Task): Promise<void> {
    await this.prismaClient.task.create({
      data: task
    });
  }
}
