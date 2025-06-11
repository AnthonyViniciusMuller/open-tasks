import { Router } from "express";
import { PrismaUserRepo } from "../../infra/repository/user/prisma";
import { PrismaClient } from "@prisma/client";
import { Register } from "../../application/usecases/user/register/register";
import { RegisterController } from "./auth/register";

const primaClient = new PrismaClient();
const userRepo = new PrismaUserRepo(primaClient);


const registerUsecase = new Register(userRepo);
const registerController = new RegisterController(registerUsecase);

const router = Router();

router.post("/register", (req, res) => registerController.handle(req, res));

export default router;
