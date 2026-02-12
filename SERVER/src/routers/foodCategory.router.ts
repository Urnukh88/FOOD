import { Router } from "express";
import {
  createNewCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/foodCategory";

export const categoryRouter = Router();

categoryRouter.post("/food-category", createNewCategory);
categoryRouter.get("/get-category", getCategory);
categoryRouter.patch("/update-category", updateCategory);
categoryRouter.delete("/delete-category", deleteCategory);

export default categoryRouter;
