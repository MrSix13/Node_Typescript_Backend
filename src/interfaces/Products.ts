import { ObjectId, Document } from "mongoose";

export interface IProduct extends Document {
  _id?: ObjectId | string;
  name: string;
  price: number;
  description: string;
  ingredients: ObjectId[] | string[];
  createdAt?: Date;
}
