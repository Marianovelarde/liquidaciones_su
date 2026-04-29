import {
  getAllCategoriesRepo,
  createCategoryRepo,
  updateCategoryRepo,
  deleteCategoryRepo,
} from "../repository/category.repository";

export const getAllCategoriesService = async () => {
  return await getAllCategoriesRepo();
};

export const createCategoryService = async (data: {
  name: string;
  coefficient: number;
  pricePerM2: number;
}) => {
  return await createCategoryRepo(data);
};

export const updateCategoryService = async (
  id: number,
  data: {
    name?: string;
    coefficient?: number;
    pricePerM2?: number;
  }
) => {
  return await updateCategoryRepo(id, data);
};

export const deleteCategoryService = async (id: number) => {
  return await deleteCategoryRepo(id);
};