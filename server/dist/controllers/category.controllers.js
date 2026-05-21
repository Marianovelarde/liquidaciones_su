"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategories = void 0;
const category_services_1 = require("../services/category.services");
const getCategories = async (_req, res) => {
    try {
        const categories = await (0, category_services_1.getAllCategoriesService)();
        res.json(categories);
    }
    catch {
        res.status(500).json({
            error: "Error obteniendo categorías",
        });
    }
};
exports.getCategories = getCategories;
const createCategory = async (req, res) => {
    try {
        console.log("BODY RECIBIDO:", req.body);
        const category = await (0, category_services_1.createCategoryService)(req.body);
        console.log("CATEGORY CREADA:", category);
        res.status(201).json(category);
    }
    catch (error) {
        console.error("ERROR CREATE CATEGORY:", error);
        res.status(500).json({
            error: "Error creando categoría",
            detail: error,
        });
    }
};
exports.createCategory = createCategory;
const updateCategory = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const category = await (0, category_services_1.updateCategoryService)(id, req.body);
        res.json(category);
    }
    catch {
        res.status(500).json({
            error: "Error actualizando categoría",
        });
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res) => {
    try {
        const id = Number(req.params.id);
        await (0, category_services_1.deleteCategoryService)(id);
        res.json({
            message: "Categoría eliminada correctamente",
        });
    }
    catch {
        res.status(500).json({
            error: "Error eliminando categoría",
        });
    }
};
exports.deleteCategory = deleteCategory;
