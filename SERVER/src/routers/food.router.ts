import {
  createFoodList,
  deleteFoodList,
  getFoodById,
} from "../controllers/food";
import { Router } from "express";

export const foodRouter = Router();
foodRouter.post("/create-food", createFoodList);
foodRouter.delete("/:id", deleteFoodList);
foodRouter.get("/:foodId", getFoodById);
