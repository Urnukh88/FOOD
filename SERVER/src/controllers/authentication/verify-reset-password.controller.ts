// import { Request, Response } from "express";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import { UserModel } from "../../schema";
// import { OTPModel } from "../../schema";

// export const verifyOTP = async (req: Request, res: Response) => {
//   try {
//     const { otp } = req.body;
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer")) {
//       throw new Error("Invalid Token");
//     }
//     const token = authHeader.split("")[1];
//     const verifyDecoded = jwt.verify(
//       String(token),
//       process.env.JWT_SECRET as string,
//     ) as JwtPayload;
//     const { _id } = verifyDecoded;
//     const user = await UserModel.findOne({ _id });

//     if (!user) {
//       return res.status(404).send({ message: "user oldsongui" });
//     }

//     const userId = user?._id;

//     const shalgahOTP = await OTPModel.findOne({ userId });

//     if (!shalgahOTP) {
//       return res.status(404).send({ message: "OTP oldsongui" });
//     }

//     if (otp !== shalgahOTP.otp) {
//       return res.status(200).json({ message: "failed" });
//     } else {
//       const tokenThird = jwt.sign({ id: userId }, "secretToken", {
//         expiresIn: "1d",
//       });

//       res
//         .status(200)
//         .redirect(
//           `https://food-0eii.onrender.com/authentication/request-reset?token=${tokenThird}`,
//         );
//     }
//   } catch (error) {
//     return res.status(500).json({ message: " error", error: error });
//   }
// };
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyResetPasswordRequest = async (
  req: Request,
  res: Response,
) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    jwt.verify(token as string, process.env.JWT_SECRET as string);

    return res.status(200).json({
      message: "Valid token",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Invalid or expired token",
    });
  }
};
