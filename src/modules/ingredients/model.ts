import { IIngredient } from "interfaces";
import { Schema, model } from "mongoose";

const ingredientsSchema = new Schema<IIngredient>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const IngredientsModel = model<IIngredient>(
  "Ingredient",
  ingredientsSchema,
);
