// import { Request, Response } from "express";
// import { UserModel } from "../../schema";
// import jwt from "jsonwebtoken";
// import otpgenerator from "otp-generator";
// import { resetPassReq } from "../../utils/resetPassword-request-utils";
// import { OTPModel } from "../../schema";

// export const authResetPasswordReq = async (req: Request, res: Response) => {
//   try {
//     const { email } = req.body;

//     const user = await UserModel.findOne({ email });

//     if (!user) return res.status(404).json({ message: "Hereglegch oldsongui" });

//     const resetToken = jwt.sign(
//       { _id: user._id },
//       process.env.JWT_SECRET as string,
//       { expiresIn: "1h" },
//     );

//     const otp = otpgenerator.generate(6, {
//       digits: true,
//       lowerCaseAlphabets: false,
//       upperCaseAlphabets: false,
//       specialChars: false,
//     });
//     await OTPModel.create({
//       userId: user._id,
//       otp,
//     });

//     await resetPassReq(
//       email,
//       `${process.env.TEST_API}/authentication/request-reset?token=${resetToken}`,
//       otp,
//     );

//     return res
//       .status(200)
//       .redirect(
//         `https://food-0eii.onrender.com/authentication/request-reset?token=${resetToken}`,
//       );
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .json({ message: "cannot reset password", error: error });
//   }
// };
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../../schema";

export const resetPasswordRequest = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User oldsongui" });
    }

    const resetToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "15m" },
    );

    const resetLink = `https://food-0eii.onrender.com/authentication/reset-password?token=${resetToken}`;

    console.log("RESET LINK:", resetLink);

    return res.status(200).json({
      message: "Reset password link ilgeegdlee",
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
