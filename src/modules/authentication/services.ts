import { UserModel } from "./model";

//Create user
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());

//Find user by email
export const getUserbyEmail = (email: string) => UserModel.findOne({ email });
