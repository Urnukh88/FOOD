import { createNewUser } from "../controllers/User";
import { SignInController } from "../controllers/User";
import { Router } from "express";

export const userRouter = Router();
userRouter.post("/user-signup", createNewUser);
userRouter.post("/user-signin", SignInController);
