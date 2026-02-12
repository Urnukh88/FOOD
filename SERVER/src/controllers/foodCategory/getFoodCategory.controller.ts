import { FoodCategorySchema } from "../../schema";
import { Request, Response } from "express";

export const getCategory = async (res: Response, req: Request) => {
  try {
    const categories = await FoodCategorySchema.find().sort({ createdAt: -1 });

    return res.status(200).send({ data: categories });
  } catch (error) {
    return res.status(500).send({ message: "Failed Cateogires", error });
  }
};
