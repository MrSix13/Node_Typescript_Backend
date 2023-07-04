import { Request, Response, NextFunction } from "express";
import {
  createIngredient,
  deleteIngredient,
  getAllIngredients,
  getIngredientsById,
  updateIngredient,
} from "./services";

//Controlador para crear un ingrediente
export const createIngredientController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, description } = req.body;

    const ingredient = await createIngredient({ name, description });

    return res
      .status(201)
      .json({ message: "Ingrediente Creado Correctamente", ingredient });
  } catch (error) {
    next(error);
  }
};

//Controllador para obtener todos los ingredientes
export const getIngredientsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const ingredients = await getAllIngredients();
    return res.status(201).json(ingredients);
  } catch (error) {
    next(error);
  }
};

//Controllador para obtener un ingrediente por su ID
export const getIngredientByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const ingredient = await getIngredientsById(id);

    if (!ingredient) {
      return res.status(404).json({ message: "Ingrediente no encontrado" });
    }

    return res.status(201).json(ingredient);
  } catch (error) {
    next(error);
  }
};

// Controlador para actualizar un ingrediente
export const updateIngredientController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Obtener el ID del ingrediente de los parámetros de la solicitud
    const { id } = req.params;

    // Obtener los datos actualizados del ingrediente del cuerpo de la solicitud
    const { name, description, price } = req.body;

    // Llamar al servicio para actualizar el ingrediente
    const updatedIngredient = await updateIngredient(id, {
      name,
      description,
    });

    // Verificar si se encontró el ingrediente y se actualizó correctamente
    if (!updatedIngredient) {
      return res.status(404).json({ message: "Ingrediente no encontrado" });
    }

    // Responder con el ingrediente actualizado
    return res.status(201).json({
      message: "Ingrediente Actualizado correctamente",
      updatedIngredient,
    });
  } catch (error) {
    // Manejar el error
    next(error);
  }
};

//Controlador para eliminar un ingrediente
export const deleteIngredientController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    // Llamar al servicio para eliminar el ingrediente
    await deleteIngredient(id);

    // Enviar respuesta exitosa al cliente
    res.status(200).json({ message: "Ingrediente eliminado exitosamente" });
  } catch (error) {
    // Pasar el error al siguiente middleware de manejo de errores
    next(error);
  }
};
