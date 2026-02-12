import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyResetToken = (req: Request, res: Response) => {
  const { token } = req.query;
  if (!token) return res.status(400).json({ message: "Token required" });

  try {
    jwt.verify(token as string, process.env.JWT_SECRET as string);
    return res.status(200).json({ message: "Zuw token" });
  } catch {
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};
