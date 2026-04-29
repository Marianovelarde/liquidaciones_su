// src/repository/product.repository.ts
import { Prisma } from "@prisma/client";
import prisma from "../prisma/client";
import { CreateProductDTO } from "../dtos/liquidation.dto";

// src/repository/product.repository.ts
export const createProductRepo = async (dto: CreateProductDTO) => {
  return await prisma.product.create({ 
    data: {
      name: dto.name,
      description: dto.description,
      // Usamos 'connect' para vincular el producto con la categoría existente
      category: dto.categoryId ? { connect: { id: dto.categoryId } } : undefined,
    },
    include: { category: true }
  });
};

export const getAllProductsRepo = async () => {
  //findMany con include para traer también el nombre del rubro asociado a cada producto
  
  return await prisma.product.findMany({
    include: { category: true }, // Crucial para ver el nombre del rubro en el frontend
    orderBy: { createdAt: "desc" },
  });
};
export const getProductByIdRepo = async (id: number) => {
  return await prisma.product.findUnique({
    where: { id },
  });
};

export const updateProductRepo = async (
  id: number, 
  data: Prisma.ProductUpdateInput // Usamos el tipo de Prisma para actualizaciones
) => {
  return await prisma.product.update({
    where: { id },
    data,
  });
};

export const deleteProductRepo = async (id: number) => {
  return await prisma.product.delete({
    where: { id },
  });
};