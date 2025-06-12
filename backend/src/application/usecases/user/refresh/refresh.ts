import { UserRepo } from "../../../../domain/user/repository/user";
import { AuthService } from "../../../service/auth";
import { Usecase } from "../../usecase";
import { RefreshInDto, RefreshOutDto } from "./dto";

export class Refresh implements Usecase<RefreshInDto, RefreshOutDto> {
    constructor(
        private readonly userRepo: UserRepo,
        private readonly authService: AuthService
    ) {}

    async execute(input: RefreshInDto): Promise<RefreshOutDto> {
        const { claims, error } = this.authService.verify(input.token);
        if (error) {
            throw error;
        }

        if (!claims.sub || typeof claims.sub != "string") {
            throw new Error("Invalid refresh token");
        }

        const user = await this.userRepo.getById(claims.sub);
        if (!user) {
            throw new Error("User not found");
        }

        const token = this.authService.generate({
            sub: user.id,
            email: user.email,
        });

        const refreshToken = this.authService.generateRefresh({
            sub: user.id,
            email: user.email,
        });

        return { token, refreshToken };
    }
}