import { UserModel } from "../../schema";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../../utils/mail-utils";

export const createNewUser = async (req: Request, res: Response) => {
  try {
    const { email, password, phoneNumber, address, role } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Hereglegch ali hediin burtgeltei baina",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      email,
      password: hashPassword,
      // phoneNumber: phoneNumber || "",
      // address: address || "",
      // role: role || "USER",
    });

    const token = jwt.sign({ email }, process.env.JWT_SECRET!, {
      expiresIn: 600,
    });

    await sendVerificationEmail(
      email,
      `${process.env.TEST_API}/auth/verify-email?token=${token}`,
    );

    return res.status(201).json({
      success: true,
      message: "Verification email sent",
      data: {
        id: newUser._id,
        email: newUser.email,
        // phoneNumber: newUser.phoneNumber,
        // address: newUser.address,
        // role: newUser.role,
        // isVerified: newUser.isVerified,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Serveriin aldaa",
      error,
    });
  }
};
