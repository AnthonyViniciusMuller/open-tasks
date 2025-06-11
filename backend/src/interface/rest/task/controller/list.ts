import { Response } from "express";
import { List } from "../../../../application/usecases/task/list/list";
import { AuthorizedRequest } from "../../middleware/auth";

export class ListController {
  constructor(private readonly listUsecase: List) {}

  async handle(req: AuthorizedRequest, res: Response) {
    try {
      if (!req.userId) {
        res.status(401).json({ message: 'No token provided' });
        return
      }

      const result = await this.listUsecase.execute({ userId: req.userId });
      
      res.status(200).json(result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      res.status(400).json({ error: errorMessage });
    }
  };
}
