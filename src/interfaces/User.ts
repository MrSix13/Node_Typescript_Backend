import { ObjectId, Document } from "mongoose";

export interface IUser extends Document {
  _id?: string | ObjectId;
  name: string;
  email: string;
  isAdmin?: boolean;
  authentication?: object | any;
  createdAt?: Date;
}
