import { Request, Response } from "express";
import { FoodOrderModel } from "../../schema";

export const getFoodOrder = async (req: Request, res: Response) => {
  try {
    const getFoodOrderAPI = await FoodOrderModel.find();
    res.status(200).send({
      message: "Food Category fetched succesfully",
      data: getFoodOrderAPI,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
