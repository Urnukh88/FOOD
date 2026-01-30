import { model, models, Schema, Types } from "mongoose";

export type Food = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: Types.ObjectId;
};

const foodSchema = new Schema<Food>(
  {
    foodName: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    ingredients: { type: String, required: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true },
);

export const FoodModel = models.Food || model<Food>("Food", foodSchema);
