import { Document } from "mongoose";

export interface IIngredients extends Document {
  name: string;
  description: string;
  createdAt: Date;
}
