import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../../schema";

export const verifyEmailController = async (req: Request, res: Response) => {
  try {
    const token = req.query.token as string;

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as {
      email: string;
    };

    const verifiedUser = await UserModel.findOneAndUpdate(
      { email: decodedToken.email },
      { isVerified: true },
      { new: true },
    );
    if (verifiedUser) {
      return res.status(200).json({ message: "success", data: verifiedUser });
    } else {
      return res.status(400).json({ message: "error" });
    }
  } catch (error) {
    return res.status(400).json({ message: "internal server error", error });
  }
};
