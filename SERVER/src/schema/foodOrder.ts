import mongoose, { model, Schema, Types } from "mongoose";

enum foodOrderStatus {
  PENDING = "pending",
  CANCELED = "canceled",
  DELIVERED = "delivered",
}

const foodOrderItemSchema = new Schema({
  food: { type: Schema.Types.ObjectId, ref: "Food", required: true },
  quantity: { type: Number, required: true, default: 1 },
});

type FoodOrderItem = {
  food: Types.ObjectId;
  quantity: number;
};

type FoodOrder = {
  user: Types.ObjectId;
  totalPrice: number;
  foodOrderItems: FoodOrderItem[];
  status: foodOrderStatus;
  createdAt: Date;
  updatedAt: Date;
};

export const FoodOrderSchema = new Schema<FoodOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    totalPrice: { type: Number, required: true },
    foodOrderItems: {
      type: [foodOrderItemSchema],
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(foodOrderStatus),
      default: foodOrderStatus.PENDING,
    },
  },
  { timestamps: true },
);

export const FoodOrderModel =
  mongoose.models.FoodOrder || model<FoodOrder>("FoodOrder", FoodOrderSchema);
