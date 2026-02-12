import { models, model, Schema, Models, Model } from "mongoose";
import { Mode } from "node:fs";

type FoodCategory = {
  // _id: ObjectId;
  categoryName: String;
  createdAt: Date;
  updatedAt: Date;
};

export const FoodcategorySchema = new Schema<FoodCategory>(
  {
    categoryName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  // { _id: false },
);

export const FoodCategorySchema: Model<FoodCategory> =
  models["categories"] || model<FoodCategory>("categories", FoodcategorySchema);
