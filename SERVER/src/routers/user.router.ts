import {
  SignIncontroller,
  createNewUser,
  verifyEmailController,
  resetPassword,
  authResetPassword,
} from "../controllers/authentication";
import { Router } from "express";

export const userRouter = Router();
userRouter.post("/user-signup", createNewUser);
userRouter.post("/user-signin", SignIncontroller);
userRouter.get("/verify-email", verifyEmailController);
userRouter.post("/request-reset", authResetPassword);
userRouter.post("/reset-password", resetPassword);
