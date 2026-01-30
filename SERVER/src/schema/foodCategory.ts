import { models, model, Schema, ObjectId } from "mongoose";

type FoodCategory = {
  _id: ObjectId;
  categoryName: String;
  createdAt: Date;
  updatedAt: Date;
};

export const FoodCategorySchema = new Schema<FoodCategory>(
  {
    categoryName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { _id: false },
);

export const Food_Category_Schema =
  models["Foods"] || model("Foods", FoodCategorySchema);
