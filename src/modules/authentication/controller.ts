import { Request, Response, NextFunction } from "express";

import { errorHandler } from "../../shared/middlewares/errorHandler";
import { createUser, getUserbyEmail } from "./services";
import { authentication, generateToken, random } from "../../shared/helpers";
import { IUser } from "interfaces";

interface RegisterResponse {
  user: IUser;
  token: string;
}

interface LoginResponse {
  user: IUser;
  token: string;
}

export const login = async (
  req: Request,
  res: Response<LoginResponse>,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    // Validar que se proporcionen el correo electrónico y la contraseña
    if (!email || !password) {
      return res.sendStatus(400);
    }

    // Obtener el usuario correspondiente al correo electrónico
    const user = await getUserbyEmail(email).select(
      "+authentication.salt +authentication.password",
    );
    // Verificar si el usuario existe
    if (!user) {
      return res.sendStatus(400);
    }

    // Verificar la contraseña proporcionada con el hash esperado
    const expectedHash = authentication(user.authentication.salt, password);
    if (user.authentication.password != expectedHash) {
      return res.sendStatus(403);
    }

    // Generar el token JWT
    const token = generateToken(
      { id: user._id, name: user.name, isAdmin: user.isAdmin },
      process.env.SECRET_JWT,
      "1h",
    );
    const response: LoginResponse = {
      user: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      } as IUser,
      token,
    };

    res.cookie("SUSHI-AUTH", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
      httpOnly: true,
      secure: true,
    });
    return res.status(200).json(response).end();
  } catch (error) {
    console.log(error);
    errorHandler(error, req, res, next);
  }
};

export const register = async (
  req: Request,
  res: Response<RegisterResponse>,
  next: NextFunction,
) => {
  try {
    const { email, password, name } = req.body;
    console.log({ email, password, name });
    // Validar que se proporcionen el correo electrónico, contraseña y nombre de usuario
    if (!email || !password || !name) {
      return res.sendStatus(400);
    }

    // Verificar si ya existe un usuario con el mismo correo electrónico
    const existingUser = await getUserbyEmail(email);
    if (existingUser) {
      return res.sendStatus(400);
    }

    // Generar una sal única para el usuario y hashear la contraseña
    const salt = random();
    const hashedPassword = authentication(salt, password);

    // Crear el nuevo usuario en la base de datos
    const user = await createUser({
      email,
      name,
      authentication: {
        salt,
        password: hashedPassword,
      },
    });

    // Generar el token JWT
    const token = generateToken(
      { id: user._id, name: user.name, isAdmin: user.isAdmin },
      process.env.SECRET_JWT!,
      "1h",
    );

    const response: RegisterResponse = {
      user: {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        _id: user._id.toString(),
      } as IUser,
      token,
    };

    return res.status(200).json(response).end();
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};
