// import { Request, Response } from "express";
// import { UserModel } from "../../schema";
// import bcrypt from "bcrypt";

// export const SignIncontroller = async (req: Request, res: Response) => {
//   try {
//     const { password, email } = req.body;
//     const existingUser = await UserModel.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({
//         success: false,
//         message: "Email already registered",
//       });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = await UserModel.create({
//       email,
//       password: hashedPassword,
//       isVerified: false,
//     });
//     res.status(200).send({ message: "Amjilttai butsaalaa", data: newUser });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Internal server error",
//       error,
//     });
//   }
// };
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../../schema";

export const SignIncontroller = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User oldsongui",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Password buruu",
      });
    }

    return res.status(200).json({
      message: "Amjilttai nevterlee",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber,
        address: user.address,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error,
    });
  }
};
