"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryService = exports.updateCategoryService = exports.createCategoryService = exports.getAllCategoriesService = void 0;
const category_repository_1 = require("../repository/category.repository");
const getAllCategoriesService = async () => {
    return await (0, category_repository_1.getAllCategoriesRepo)();
};
exports.getAllCategoriesService = getAllCategoriesService;
const createCategoryService = async (data) => {
    const existingCategory = await (0, category_repository_1.getCategoryByNameRepo)(data.name);
    if (existingCategory) {
        throw new Error("Ya existe una categoría con ese nombre");
    }
    return await (0, category_repository_1.createCategoryRepo)(data);
};
exports.createCategoryService = createCategoryService;
const updateCategoryService = async (id, data) => {
    return await (0, category_repository_1.updateCategoryRepo)(id, data);
};
exports.updateCategoryService = updateCategoryService;
const deleteCategoryService = async (id) => {
    return await (0, category_repository_1.deleteCategoryRepo)(id);
};
exports.deleteCategoryService = deleteCategoryService;
