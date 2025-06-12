export type RefreshInDto = {
    token: string;
}

export type RefreshOutDto = {
    token: string;
    refreshToken: string;
};