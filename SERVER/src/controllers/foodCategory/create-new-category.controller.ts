import { Food_Category_Schema } from "../../schema";
import { Request, Response } from "express";

export const createNewCategory = async (res: Response, req: Request) => {
  try {
    const { categoryName } = req.body;
    const category = await Food_Category_Schema.create();
    res.status(200).json({ message: "asdasdadsdsadsa" });
  } catch (error) {
    res.status(200).json({ message: "categoryyyyfdgdg", error });
  }
};
