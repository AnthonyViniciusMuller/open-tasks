import { User } from "../entity/user";

export interface UserRepo {
    create(input: User): Promise<void>;
    getByEmail(email: string): Promise<User | null>;
}