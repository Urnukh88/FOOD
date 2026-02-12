// import { Request, Response } from "express";
// import { UserModel } from "../../schema";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import bcrypt from "bcrypt";

// export const newPassword = async (req: Request, res: Response) => {
//   try {
//     const { token } = req.query;

//     const { newPassword } = req.body;

//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     const decoded = jwt.decode(String(token)) as JwtPayload;

//     const { email } = decoded;

//     const updateUser = await UserModel.findOneAndUpdate(
//       { email },
//       { password: hashedPassword },
//       { new: true },
//     );
//     return res.status(200).send({ message: "success", updateUser });
//   } catch (error) {
//     console.error(error);
//     return res.status(401).json({ message: "error", error });
//   }
// };
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
  } catch {
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};
