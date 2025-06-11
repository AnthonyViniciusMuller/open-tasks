import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { Create } from "../../../application/usecases/task/create/create";
import { PrismaUserRepo } from "../../../infra/repository/user/prisma";
import { PrismaTaskRepo } from "../../../infra/repository/task/prisma";
import { CreateController } from "./controller/create";
import { AuthMiddleware } from "../middleware/auth";
import { JwtService } from "../../../infra/service/auth/jwt";

const primaClient = new PrismaClient();
const TaskRepo = new PrismaTaskRepo(primaClient);
const UserRepo = new PrismaUserRepo(primaClient);
const authService = new JwtService();

const createUsecase = new Create(UserRepo, TaskRepo);

const createController = new CreateController(createUsecase);
const authMiddleware = new AuthMiddleware(authService)

const router = Router();

router.use((req, res, next) => authMiddleware.handle(req, res, next));

router.post("", (req, res) => createController.handle(req, res));

export default router;
