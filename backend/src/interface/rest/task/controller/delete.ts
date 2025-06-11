import { Request, Response } from "express";
import { Delete } from "../../../../application/usecases/task/delete/delete";

export class DeleteController {
  constructor(private readonly deleteUsecase: Delete) {}

  async handle(req: Request, res: Response) {
    try {
      const result = await this.deleteUsecase.execute({
        id: req.params["id"],
      });

      res.status(200).json(result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      res.status(400).json({ error: errorMessage });
    }
  };
}
