import { Request, Response } from "express";
import {
  getAllCategoriesService,
  createCategoryService,
  updateCategoryService,
  deleteCategoryService,
} from "../services/category.services";

export const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await getAllCategoriesService();
    res.json(categories);
  } catch {
    res.status(500).json({
      error: "Error obteniendo categorías",
    });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    console.log("BODY RECIBIDO:", req.body);

    const category = await createCategoryService(req.body);

    console.log("CATEGORY CREADA:", category);

    res.status(201).json(category);
  } catch (error) {
    console.error("ERROR CREATE CATEGORY:", error);

    res.status(500).json({
      error: "Error creando categoría",
      detail: error,
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const category = await updateCategoryService(id, req.body);
    res.json(category);
  } catch {
    res.status(500).json({
      error: "Error actualizando categoría",
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await deleteCategoryService(id);

    res.json({
      message: "Categoría eliminada correctamente",
    });
  } catch {
    res.status(500).json({
      error: "Error eliminando categoría",
    });
  }
};