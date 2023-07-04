import { ObjectId } from "mongoose";

interface User {
  _id?: string | ObjectId;
  name: string;
  email: string;
  isAdmin?: boolean;
  createdAt?: Date;
}

export default User;
