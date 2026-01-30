import { Request, Response } from "express";
import { UserModel } from "../../schema";
import bcrypt from "bcrypt";

export const SignInController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const useApi = await UserModel.findOne({ email });

    if (!useApi) return res.status(404).send({ message: "User not Found" });

    const isPasswordValid = await bcrypt.compare(password, useApi.password);
    console.log(isPasswordValid);

    if (!isPasswordValid)
      return res.status(401).send({ messsage: "User not Found" });

    res
      .status(200)
      .send({ message: "User signed in succesfully", data: useApi });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "error signed in", error: error });
  }
};
