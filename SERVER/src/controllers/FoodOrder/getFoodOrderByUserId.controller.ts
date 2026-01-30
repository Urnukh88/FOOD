import { Request, Response } from "express";
import { FoodOrderModel } from "../../schema";

export const getFoodOrderByUserId = async (req: Request, res: Response) => {
  try {
    const getFoodOrderUserId = await FoodOrderModel.find().populate("User");

    res.status(200).send({
      message: "Food cart fetched succesfully",
      data: getFoodOrderUserId,
    });
  } catch (error) {
    res.status(500).send({ message: "Error creating food cart", error: error });
  }
};
