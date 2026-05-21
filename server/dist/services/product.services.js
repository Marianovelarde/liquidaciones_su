"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductService = exports.updateProductService = exports.getAllProductsService = exports.createProductService = void 0;
const product_repository_1 = require("../repository/product.repository");
const createProductService = async (data) => {
    if (!data.name) {
        throw new Error("El nombre es obligatorio");
    }
    return await (0, product_repository_1.createProductRepo)(data);
};
exports.createProductService = createProductService;
const getAllProductsService = async () => {
    return await (0, product_repository_1.getAllProductsRepo)();
};
exports.getAllProductsService = getAllProductsService;
const updateProductService = async (id, data) => {
    const existing = await (0, product_repository_1.getProductByIdRepo)(id);
    if (!existing) {
        throw new Error("Producto no encontrado");
    }
    return await (0, product_repository_1.updateProductRepo)(id, data);
};
exports.updateProductService = updateProductService;
const deleteProductService = async (id) => {
    const existing = await (0, product_repository_1.getProductByIdRepo)(id);
    if (!existing) {
        throw new Error("Producto no encontrado");
    }
    return await (0, product_repository_1.deleteProductRepo)(id);
};
exports.deleteProductService = deleteProductService;
