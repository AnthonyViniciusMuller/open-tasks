import { Request, Response } from "express";
import { Update } from "../../../../application/usecases/task/update/update";

export class UpdateController {
  constructor(private readonly updateUsecase: Update) {}

  async handle(req: Request, res: Response) {
    try {
      const result = await this.updateUsecase.execute({
        id: req.params["id"],
        label: req.body.label,
        description: req.body.description,
        isFinished: req.body.isFinished,
        expiresAt: req.body.expiresAt ? new Date(req.body.expiresAt) : null,
      });

      res.status(200).json(result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      res.status(400).json({ error: errorMessage });
    }
  };
}
