import { pbkdf2Sync, timingSafeEqual } from "crypto";
import { CRYPTO_SALT, CRYPTO_ITERATIONS, CRYPTO_KEY_LENGTH, CRYPTO_DIGEST } from "../../../../constants/crypto";
import { UserRepo } from "../../../../domain/user/repository/user";
import { AuthService } from "../../../service/auth";
import { Usecase } from "../../usecase";
import { LoginInDto, LoginOutDto } from "./dto";

export class Login implements Usecase<LoginInDto, LoginOutDto> {
    constructor(
        private readonly userRepo: UserRepo,
        private readonly authService: AuthService
    ) {}

    async execute(input: LoginInDto): Promise<LoginOutDto> {
        const user = await this.userRepo.getByEmail(input.email);
        if (!user) {
            throw new Error("Email and password mismatch"); 
        }

        const isPasswordCorrect = this.verifyPassword(input.password, user.password);
        if (!isPasswordCorrect) {
            throw new Error("Email and password mismatch"); 
        }

        const token = this.authService.generate({
            sub: user.id,
            email: user.email,
        }, 1);

        const refreshToken = this.authService.generate({
            sub: user.id,
            email: user.email,
        }, 7 * 24);

        return { token, refreshToken };
    }

    public verifyPassword(password: string, hashedPassword: string) {
        const hashBuffer = pbkdf2Sync(password, CRYPTO_SALT, CRYPTO_ITERATIONS, CRYPTO_KEY_LENGTH, CRYPTO_DIGEST);
        const storedHashBuffer = Buffer.from(hashedPassword, 'hex');

        if (hashBuffer.length !== storedHashBuffer.length) {
            return false;
        }
        
        return timingSafeEqual(hashBuffer, storedHashBuffer);
    }
}