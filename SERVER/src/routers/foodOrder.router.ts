import { Router } from "express";
import {
  postFoodOrder,
  getFoodOrder,
  getFoodOrderByUserId,
  updateFoodByFoodOrderId,
} from "../controllers/FoodOrder";

export const foodOrderRouter = Router();
foodOrderRouter.post("/food-order", postFoodOrder);
foodOrderRouter.get("/getFood-order", getFoodOrder);
foodOrderRouter.get("/food-order/:userId", getFoodOrderByUserId);
foodOrderRouter.patch("/:id", updateFoodByFoodOrderId);
