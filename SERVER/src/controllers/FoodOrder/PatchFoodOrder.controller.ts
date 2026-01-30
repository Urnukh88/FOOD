import { Request, Response } from "express";
import mongoose from "mongoose";
import { FoodOrderModel } from "../../schema";

export const updateFoodByFoodOrderId = async (req: Request, res: Response) => {
  try {
    const { foodOrderId } = req.params;

    if (!foodOrderId || !mongoose.Types.ObjectId.isValid("foodOrderId")) {
      return res.status(400).json({ message: "Invalid FoodOrder id" });
    }

    const { user, totalPrice, foodOrderItems, status } = req.body;

    const updatedFoodOrder = await FoodOrderModel.findOneAndUpdate(
      { _id: foodOrderId },
      {
        user,
        totalPrice,
        foodOrderItems,
        status,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedFoodOrder) {
      return res.status(404).json({ message: "FoodOrder not found" });
    }

    return res.status(200).json({
      message: "FoodOrder updated successfully",
      data: updatedFoodOrder,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Update failed" });
  }
};
