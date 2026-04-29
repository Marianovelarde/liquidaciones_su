import {
  createProductRepo,
  getAllProductsRepo,
  getProductByIdRepo,
  updateProductRepo,
  deleteProductRepo,
} from "../repository/product.repository";
import { CreateProductDTO, UpdateProductDTO } from "../dtos/liquidation.dto";

export const createProductService = async (data: CreateProductDTO) => {
  if (!data.name) {
    throw new Error("El nombre es obligatorio");
  }

  return await createProductRepo(data);
};

export const getAllProductsService = async () => {
  return await getAllProductsRepo();
};

export const updateProductService = async (
  id: number,
  data: UpdateProductDTO
) => {
  const existing = await getProductByIdRepo(id);

  if (!existing) {
    throw new Error("Producto no encontrado");
  }

  return await updateProductRepo(id, data);
};

export const deleteProductService = async (id: number) => {
  const existing = await getProductByIdRepo(id);

  if (!existing) {
    throw new Error("Producto no encontrado");
  }

  return await deleteProductRepo(id);
};