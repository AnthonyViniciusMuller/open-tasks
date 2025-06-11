import { pbkdf2Sync } from "crypto";
import { User } from "../../../../domain/user/entity/user";
import { UserRepo } from "../../../../domain/user/repository/user";
import { Usecase } from "../../usecase";
import { RegisterInDto, RegisterOutDto } from "./dto";
import { CRYPTO_SALT, CRYPTO_ITERATIONS, CRYPTO_KEY_LENGTH, CRYPTO_DIGEST } from "../../../../constants/crypto";

export class Register implements Usecase<RegisterInDto, RegisterOutDto> {
    constructor(private readonly userRepo: UserRepo) {}

    async execute(input: RegisterInDto): Promise<RegisterOutDto> {
        const alreadyRegisteredUser = await this.userRepo.getByEmail(input.email);
        if (alreadyRegisteredUser) {
            throw new Error("User already registered"); 
        }

        const user = new User(input);

        user.password = pbkdf2Sync(user.password, CRYPTO_SALT, CRYPTO_ITERATIONS, CRYPTO_KEY_LENGTH, CRYPTO_DIGEST).toString('hex');

        await this.userRepo.create(user);

        return { id: user.id};
    }
}