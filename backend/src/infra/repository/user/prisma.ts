import { PrismaClient } from '@prisma/client';
import { User } from '../../../domain/user/entity/user';
import { UserRepo } from '../../../domain/user/repository/user';

export class PrismaUserRepo implements UserRepo {
  constructor(private readonly prismaClient: PrismaClient) {}

  async create(input: User): Promise<void> {
    await this.prismaClient.user.create({
      data: {
        id: input.id,
        email: input.email,
        password: input.password,
      },
    });
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = await this.prismaClient.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    };

    return new User(user);
  }
}
