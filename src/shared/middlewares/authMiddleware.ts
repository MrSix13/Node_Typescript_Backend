import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { errorHandler } from "./errorHandler";
import { Document } from "mongoose";
import { IUser } from "interfaces";

interface AuthenticatedRequest extends Request {
  user?: IUser;
}

//Middleware para verificar usuario inicio de sesion
export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Verificar si se proporciona el token de autenticación
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "No se proporciono un token de autenticacion" });
    }

    // Verificar y decodificar el token
    const decodedToken = jwt.verify(token, process.env.SECRET_JWT) as IUser;

    // Asignar el usuario al objeto de solicitud
    req.user = decodedToken;

    next();
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

export const authorize = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log(req.user);
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Accesso no autorizado" });
    }

    next();
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};
