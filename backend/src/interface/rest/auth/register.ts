import { Request, Response } from "express";
import { Register } from "../../../application/usecases/user/register/register";

export class RegisterController {
  constructor(private readonly registerUsecase: Register) {}

  async handle(req: Request, res: Response) {
    try {
      const result = await this.registerUsecase.execute(req.body);
      res.status(201).json(result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      res.status(400).json({ error: errorMessage });
    }
  };
}
