import prisma from "../prisma/client";

export const getAllCategoriesRepo = async () => {
  return await prisma.category.findMany({
    where: {
      deletedAt: null,
    },
    orderBy: {
      name: "asc",
    },
  });
};
export const getCategoryByNameRepo =
  async (name: string) => {
    return await prisma.category.findUnique({
      where: {
        name,
      },
    });
  };
export const createCategoryRepo = async (data: {
  name: string;
  coefficient: number;
  pricePerM2: number;
}) => {
  return await prisma.category.create({
    data,
  });
};

export const updateCategoryRepo = async (
  id: number,
  data: {
    name?: string;
    coefficient?: number;
    pricePerM2?: number;
  }
) => {
  return await prisma.category.update({
    where: { id },
    data,
  });
};

export const deleteCategoryRepo = async (id: number) => {
  return await prisma.category.update({
    where: { id },
    data: {
      deletedAt: new Date(),
    },
  });
};