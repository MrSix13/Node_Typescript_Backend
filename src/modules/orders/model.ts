import { IOrder } from "interfaces";
import { Schema, model } from "mongoose";

const orderSchema = new Schema<IOrder>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ingredients: [
    {
      type: Schema.Types.ObjectId,
      ref: "Ingredient",
      required: true,
    },
  ],
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Order = model<IOrder>("Order", orderSchema);
