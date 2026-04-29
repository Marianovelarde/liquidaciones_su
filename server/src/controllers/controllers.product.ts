import { Request, Response } from "express";
import {
  createProductService,
  getAllProductsService,
  updateProductService,
  deleteProductService,
} from "../services/product.services";
import { log } from "node:console";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await createProductService(req.body);
    log("Producto creado:", product);
    res.status(201).json(product);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllProducts = async (_req: Request, res: Response) => {


  try {
    const products = await getAllProductsService();
    log("Productos obtenidos:", products);
    res.json(products);
  } catch {
    res.status(500).json({ error: "Error obteniendo productos" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const product = await updateProductService(id, req.body);

    res.json(product);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await deleteProductService(id);

    res.json({ message: "Producto eliminado" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};