import { Request, Response } from "express";
import { Login } from "../../../../application/usecases/user/login/login";

export class LoginController {
  constructor(private readonly loginUsecase: Login) {}

  async handle(req: Request, res: Response) {
    try {
      const result = await this.loginUsecase.execute(req.body);

      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      }).json({ token: result.token });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      res.status(401).json({ error: errorMessage });
    }
  };
}
