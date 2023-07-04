import { IIngredient } from "interfaces";
import { Ingredient } from "./model";

//Obtener todos los ingredientes
export const getAllIngredients = async (): Promise<IIngredient[]> => {
  try {
    const ingredients = await Ingredient.find();
    return ingredients;
  } catch (error) {
    throw new Error("Error al obtener los ingredientes");
  }
};

//Obtener un ingrediente por su ID
export const getIngredientsById = async (id: string): Promise<IIngredient> => {
  try {
    const ingredient = await Ingredient.findById(id);
    return ingredient;
  } catch (error) {
    throw new Error("Error al obtener el ingrediente");
  }
};

//Crear un nuevo Ingrediente
export const createIngredient = async (
  data: Partial<IIngredient>,
): Promise<IIngredient> => {
  try {
    const ingredient = await Ingredient.create(data);
    return ingredient;
  } catch (error) {
    throw new Error("Error al crear el ingrediente");
  }
};

// Actualizar un ingrediente
export const updateIngredient = async (
  id: string,
  data: Partial<IIngredient>,
): Promise<IIngredient | null> => {
  try {
    const ingredient = await Ingredient.findByIdAndUpdate(id, data, {
      new: true,
    });
    return ingredient;
  } catch (error) {
    throw new Error("Error al actualizar el ingrediente");
  }
};

// Eliminar un ingrediente
export const deleteIngredient = async (id: string): Promise<void> => {
  try {
    await Ingredient.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Error al eliminar el ingrediente");
  }
};
