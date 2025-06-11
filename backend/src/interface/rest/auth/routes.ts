import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { Login } from "../../../application/usecases/user/login/login";
import { Register } from "../../../application/usecases/user/register/register";
import { PrismaUserRepo } from "../../../infra/repository/user/prisma";
import { JwtService } from "../../../infra/service/auth/jwt";
import { LoginController } from "./controller/login";
import { RegisterController } from "./controller/register";

const primaClient = new PrismaClient();
const userRepo = new PrismaUserRepo(primaClient);
const authService = new JwtService();

const loginUsecase = new Login(userRepo, authService);
const loginController = new LoginController(loginUsecase);

const registerUsecase = new Register(userRepo);
const registerController = new RegisterController(registerUsecase);

const router = Router();

router.post("/register", (req, res) => registerController.handle(req, res));
router.post("/login", (req, res) =>  loginController.handle(req, res));

export default router;
