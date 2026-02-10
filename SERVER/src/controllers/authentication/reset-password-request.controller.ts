import { Request, Response } from "express";
import { UserModel } from "../../schema";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../../utils/mail-utils";

export const authResetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "10m" },
    );

    await sendVerificationEmail(user.email, resetToken);

    return res.status(200).json({ message: "Reset email sent." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "server error" });
  }
};
