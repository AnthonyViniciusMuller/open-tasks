import { NextFunction, Request, Response } from "express";
import { AuthService } from "../../../application/service/auth";

export interface AuthorizedRequest extends Request {
  userId?: string;
}

export class AuthMiddleware {
  constructor(private readonly authService: AuthService) {}

  handle(req: AuthorizedRequest, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];

      if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return
      }

      const { claims, error } = this.authService.verify(token)
      if (error) {
        res.status(403).json({ message: 'Invalid or expired token' });
        return
      }

      req.userId = `${claims.sub}`;
      next();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      res.status(400).json({ error: errorMessage });
    }
  };
}