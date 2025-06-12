import { Response } from "express";
import { Create } from "../../../../application/usecases/task/create/create";
import { AuthorizedRequest } from "../../middleware/auth";

export class CreateController {
  constructor(private readonly createUsecase: Create) {}

  async handle(req: AuthorizedRequest, res: Response) {
    try {
      if (!req.userId) {
        res.status(401).json({ message: 'No token provided' });
        return
      }

      const result = await this.createUsecase.execute({
        userId: req.userId,
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
