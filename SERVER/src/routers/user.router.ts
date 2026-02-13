import {
  SignIncontroller,
  createNewUser,
  verifyEmailController,
  resetPasswordRequest,
  verifyResetToken,
  resetPassword,
} from "../controllers/authentication";
import { Router } from "express";

export const userRouter = Router();
userRouter.post("/signup", createNewUser);
userRouter.post("/signin", SignIncontroller);
userRouter.get("/verify-email", verifyEmailController);
userRouter.post("/reset-password-request", resetPasswordRequest);
userRouter.get("/verify-reset-pass-req", verifyResetToken);
userRouter.post("/reset-password", resetPassword);
