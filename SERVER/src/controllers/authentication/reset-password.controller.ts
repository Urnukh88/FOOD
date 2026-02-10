// import { Request, Response } from "express";
// import { UserModel } from "../../schema";
// import jwt from "jsonwebtoken";

// export const authResetPassword = async (req: Request, res: Response) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({
//         message: "Email is required",
//       });
//     }

//     const user = await UserModel.findOne({ email });

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     const resetToken = jwt.sign(
//       { email: user.email },
//       process.env.JWT_SECRET!,
//       { expiresIn: "10m" },
//     );

//     return res.status(200).json({
//       message: "Reset token generated",
//       token: resetToken,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       message: "Something went wrong",
//     });
//   }
// };
import { Request, Response } from "express";
import { UserModel } from "../../schema";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;
    const { newPassword } = req.body;

    if (!token || !newPassword)
      return res
        .status(400)
        .json({ message: "Token and new password are required" });

    const decoded = jwt.verify(token as string, process.env.JWT_SECRET!) as {
      email: string;
    };

    const user = await UserModel.findOne({ email: decoded.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password successfully changed" });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
