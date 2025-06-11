export type LoginInDto = {
    email: string;
    password: string;
}

export type LoginOutDto = {
    token: string;
    refreshToken: string;
};