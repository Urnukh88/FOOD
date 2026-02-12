import { Request, Response } from "express";
import { FoodCategorySchema } from "../../schema";

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { foodCategoryId } = req.params;

    const deletedCategory =
      await FoodCategorySchema.findByIdAndDelete(foodCategoryId);

    if (!deletedCategory)
      return res.status(400).send({ message: "Category is not found" });
    return res
      .status(200)
      .send({ message: "Food Category deleted succesfully" });
  } catch (error) {
    return res.status(500).send({ message: "Failed deleting category", error });
  }
};
