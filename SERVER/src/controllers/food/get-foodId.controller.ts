import { Request, Response } from "express";
import { FoodModel } from "../../schema";

export const getFoodById = async (req: Request, res: Response) => {
  try {
    const { picture, ingredients, name, price } = req.body;
    const getFood = await FoodModel.create({
      picture,
      ingredients,
      name,
      price,
    });

    res.status(200).send({ message: "food appeared", data: getFood });
  } catch (error) {
    console.error(error);
    res.status(200).send(error);
  }
};
