import { Request, Response } from "express";
import { Create } from "../../../../application/usecases/task/create/create";

export class CreateController {
  constructor(private readonly createUsecase: Create) {}

  async handle(req: Request, res: Response) {
    try {
      const result = await this.createUsecase.execute({
        userId: req.body.userId,
        label: req.body.label,
        description: req.body.description,
        expiresAt: req.body.expiresAt ? new Date(req.body.expiresAt) : null,
      });

      res.status(201).json(result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      res.status(400).json({ error: errorMessage });
    }
  };
}
