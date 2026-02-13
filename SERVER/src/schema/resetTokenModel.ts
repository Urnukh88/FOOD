import { Schema, model, models, Types } from "mongoose";

export enum TokenType {
  RESET_PASSWORD = "RESET_PASSWORD",
  VERIFY_EMAIL = "VERIFY_EMAIL",
}

const ResetTokenSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  token: { type: String, required: true, unique: true }, // <- token field
  type: { type: String, enum: Object.values(TokenType), required: true },
  expiresAt: { type: Date, required: true, index: { expires: 0 } }, // TTL index
});

export const ResetTokenModel =
  models.ResetToken || model("ResetToken", ResetTokenSchema);
