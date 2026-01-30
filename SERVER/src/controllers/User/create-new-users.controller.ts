import { UserModel } from "../../schema";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

export const createNewUser = async (req: Request, res: Response) => {
  try {
    const { email, password, phoneNumber, address, role } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      email,
      password: hashPassword,
      phoneNumber,
      address,
      role,
    });
    await newUser.save;
    res
      .status(200)
      .json({ message: "Shine hereglegch amjilltai uuslee", user: newUser });
  } catch (error) {
    res.status(200).json({ message: "Hereglegch burtguulsen baina", error });
  }
};
