import { FoodCategorySchema } from "../../schema";
import { Request, Response } from "express";

export const createNewCategory = async (res: Response, req: Request) => {
  try {
    const { categoryName } = req.body;

    if (!categoryName || typeof categoryName !== "string") {
      return res.status(400).send({ message: "Ctaegory name is requires" });
    }

    const existingCategory = await FoodCategorySchema.findOne({
      categoryName: categoryName.trim(),
    });

    if (existingCategory)
      return res.status(409).send({ message: "Already created" });

    const category = await FoodCategorySchema.create({ categoryName });

    return res
      .status(200)
      .send({ message: "Created succesfully", data: category });
  } catch (error) {
    res.status(200).json({ message: "Failed category", error });
  }
};
