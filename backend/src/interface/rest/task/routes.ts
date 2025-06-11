import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { Create } from "../../../application/usecases/task/create/create";
import { PrismaUserRepo } from "../../../infra/repository/user/prisma";
import { PrismaTaskRepo } from "../../../infra/repository/task/prisma";
import { CreateController } from "./controller/create";
import { ListController } from "./controller/list";
import { List } from "../../../application/usecases/task/list/list";
import { AuthMiddleware } from "../middleware/auth";
import { JwtService } from "../../../infra/service/auth/jwt";

const primaClient = new PrismaClient();
const TaskRepo = new PrismaTaskRepo(primaClient);
const UserRepo = new PrismaUserRepo(primaClient);
const authService = new JwtService();

const listUsecase = new List(TaskRepo);
const createUsecase = new Create(UserRepo, TaskRepo);

const listController = new ListController(listUsecase);
const createController = new CreateController(createUsecase);

const authMiddleware = new AuthMiddleware(authService)

const router = Router();

router.use((req, res, next) => authMiddleware.handle(req, res, next));

router.get("", (req, res) => listController.handle(req, res));
router.post("", (req, res) => createController.handle(req, res));

export default router;
