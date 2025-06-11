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

  async getById(taskId: string): Promise<Task | null> {
    const task = await this.prismaClient.task.findUnique({
      where: { id: taskId }
    });

    if (!task) {
      return null;
    }

    return new Task(task);
  }

  async create(task: Task): Promise<void> {
    await this.prismaClient.task.create({
      data: task
    });
  }

  async update(taskId: string, task: Omit<Task, "id" | "userId" | "createdAt">): Promise<void> {
    await this.prismaClient.task.update({
      where: { id: taskId },
      data: task
    });
  }

  async delete(taskId: string): Promise<void> {
    await this.prismaClient.task.delete({
      where: { id: taskId }
    });
  }
}
