import { Document } from "mongoose";

export interface IIngredient extends Document {
  name: string;
  description: string;
  createdAt: Date;
}
