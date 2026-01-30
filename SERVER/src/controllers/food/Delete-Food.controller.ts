import { Request, Response } from "express";
import { FoodModel } from "../../schema";

export const deleteFoodList = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const deleted = await FoodModel.findOneAndDelete(id);

    res.status(200).send({ message: "Deleted Succesfully", data: deleted });
  } catch (error) {
    res.status(200).send(console.error(error));
  }
};
