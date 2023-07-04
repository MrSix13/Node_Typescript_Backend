import { IProduct } from "interfaces";
import { Schema, model } from "mongoose";

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      type: Schema.Types.ObjectId,
      ref: "Ingredient",
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Product = model<IProduct>("Product", productSchema);
