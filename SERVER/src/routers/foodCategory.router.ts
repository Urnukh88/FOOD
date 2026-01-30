import { Router } from "express";
import { createNewCategory } from "../controllers/foodCategory";

export const categoryRouter = Router();

categoryRouter.post("/food-category", createNewCategory);
