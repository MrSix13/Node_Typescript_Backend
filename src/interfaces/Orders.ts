import { ObjectId, Document } from "mongoose";

export interface IOrder extends Document {
  user: ObjectId | string;
  ingredients: ObjectId[];
  status: string;
  createdAt: Date;
}
