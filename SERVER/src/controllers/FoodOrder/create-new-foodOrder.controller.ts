import { FoodOrderModel } from "../../schema";
import { Request, Response } from "express";

export const postFoodOrder = async (req: Request, res: Response) => {
  try {
    const { user, totalPrice, foodOrderItems, status } = req.body;
    const postFoodOrderAPI = await FoodOrderModel.create({
      user,
      totalPrice,
      foodOrderItems,
      status,
    });

    res.status(200).send({
      message: "Food Category created succesfully",
      data: postFoodOrderAPI,
    });
  } catch (error) {
    console.error(error);
    res.status(200).send(error);
  }
};
