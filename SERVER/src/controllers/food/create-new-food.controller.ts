import { Request, Response } from "express";
import { FoodModel } from "../../schema";

export const createFoodList = async (req: Request, res: Response) => {
  try {
    const foods = req.body;

    const createdFoods = await FoodModel.insertMany(foods);

    return res.status(201).json({
      message: "Foods created successfully",
      data: createdFoods,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create foods" });
  }
};
