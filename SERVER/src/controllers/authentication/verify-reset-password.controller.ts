import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ResetTokenModel, TokenType } from "../../schema";
import { UserModel } from "../../schema";

export const verifyResetToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;
    if (!token || typeof token !== "string") {
      return res.status(400).json({ message: "Token required" });
    }

    let decoded: { userId: string };
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: string;
      };
    } catch {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const storedToken = await ResetTokenModel.findOne({
      token: token,
      type: TokenType.RESET_PASSWORD,
    } as any);

    if (!storedToken) {
      return res
        .status(400)
        .json({ message: "Token huchingui esvel ashiglagdsan" });
    }

    if (storedToken.expiresAt < new Date()) {
      await ResetTokenModel.deleteOne({ token: storedToken.token } as any);
      return res.status(400).json({ message: "Token duussan" });
    }

    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "Hereglegch oldsongui" });
    }

    return res.status(200).json({
      success: true,
      message: "Zuw token",
      data: {
        userId: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Serveriin aldaa", error });
  }
};
