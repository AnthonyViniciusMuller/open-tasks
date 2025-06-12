import { Request, Response } from "express";
import { Refresh } from "../../../../application/usecases/user/refresh/refresh";

export class RefreshController {
  constructor(private readonly refreshUsecase: Refresh) {}

  async handle(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies?.refreshToken;

      if (!refreshToken || typeof refreshToken != "string") {
        res.status(401).json({ error: "Refresh token missing" });
        
        return
      }

      const result = await this.refreshUsecase.execute({ token: refreshToken });

      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      }).json({ token: result.token });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      res.status(403).json({ error: errorMessage });
    }
  };
}




