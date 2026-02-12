import mongoose, { model, models, Schema } from "mongoose";

const userOTPSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    otp: { type: String, required: true },
    ttl: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 5 * 60 * 1000),
    },
  },
  { timestamps: true },
);

userOTPSchema.index({ ttl: 1 }, { expireAfterSeconds: 0 });

export const OTPModel =
  models["userOTP"] || mongoose.model("userOTP", userOTPSchema);
