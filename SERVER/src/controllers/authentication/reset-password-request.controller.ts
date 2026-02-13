import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../../schema";
import { sendResetTokenEmail } from "../../utils/resetPassword-request-utils";

export const resetPasswordRequest = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email required" });

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User oldsongui" });

    const resetToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "15m" },
    );

    await sendResetTokenEmail(user.email, resetToken);

    return res
      .status(200)
      .json({ message: "Reset token email-ээр ilgeegdlee" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
