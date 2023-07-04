import "dotenv/config";
import crypto from "crypto";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../../interfaces/User";

//CRYPTO
export const authentication = (salt: string, password: string): string => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(process.env.SECRET_TOKEN)
    .digest("hex");
};

export const random = () => crypto.randomBytes(128).toString("base64");

//JWT
export const generateToken = (
  payload: JwtPayload,
  secretKey: string,
  expiresIn: string,
): string => {
  return jwt.sign(payload, secretKey, { expiresIn });
};

export const verifyToken = (
  token: string,
  secretKey: string,
): JwtPayload | undefined => {
  try {
    return jwt.verify(token, secretKey) as JwtPayload;
  } catch (error) {
    return undefined;
  }
};

export const getUserFromToken = (
  token: string,
  secretKey: string,
): User | undefined => {
  const payload = verifyToken(token, secretKey);
  if (payload) {
    const user: User = {
      _id: payload._id,
      name: payload.name,
      email: payload.email,
      isAdmin: payload.isAdmin,
      createdAt: payload.createdAt,
    };
    return user;
  }

  return undefined;
};
