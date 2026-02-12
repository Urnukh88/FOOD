import { Request, Response } from "express";
import { FoodCategorySchema } from "../../schema";

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

    const { categoryName } = req.body;

    if (!categoryName || typeof categoryName !== "string") {
      return res.status(400).send({ message: "Name is required" });
    }

    const updated = await FoodCategorySchema.findByIdAndUpdate(
      categoryId,
      { categoryName },
      { new: true },
    );

    if (!updated)
      return res.status(400).send({ message: "Category is not found" });

    return res.status(200).send({ message: "Updated succesfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error", error });
  }
};
