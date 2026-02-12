import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../../schema";

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword)
      return res
        .status(400)
        .json({ message: "Token and new password required" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const user = await UserModel.findByIdAndUpdate(decoded.id, {
      password: hashedPassword,
    });
    if (!user) return res.status(404).json({ message: "User oldsongui" });

    return res.status(200).json({ message: "Password amjilttai soligdloo" });
  } catch (error) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};
