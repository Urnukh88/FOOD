import {
  SignIncontroller,
  createNewUser,
  verifyEmailController,
  resetPasswordRequest,
  verifyResetPasswordRequest,
  resetPassword,
} from "../controllers/authentication";
import { Router } from "express";

export const userRouter = Router();
userRouter.post("/user-signup", createNewUser);
userRouter.post("/user-signin", SignIncontroller);
userRouter.get("/verify-email", verifyEmailController);
userRouter.post("/reset-password-request", resetPasswordRequest);
userRouter.get("/verify-rpreq", verifyResetPasswordRequest);
userRouter.post("/reset-password", resetPassword);
