"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductRepo = exports.updateProductRepo = exports.getProductByIdRepo = exports.getAllProductsRepo = exports.createProductRepo = void 0;
const client_1 = __importDefault(require("../prisma/client"));
// src/repository/product.repository.ts
const createProductRepo = async (dto) => {
    return await client_1.default.product.create({
        data: {
            name: dto.name,
            description: dto.description,
            // Usamos 'connect' para vincular el producto con la categoría existente
            category: dto.categoryId ? { connect: { id: dto.categoryId } } : undefined,
        },
        include: { category: true }
    });
};
exports.createProductRepo = createProductRepo;
const getAllProductsRepo = async () => {
    //findMany con include para traer también el nombre del rubro asociado a cada producto
    return await client_1.default.product.findMany({
        include: { category: true }, // Crucial para ver el nombre del rubro en el frontend
        orderBy: { createdAt: "desc" },
    });
};
exports.getAllProductsRepo = getAllProductsRepo;
const getProductByIdRepo = async (id) => {
    return await client_1.default.product.findUnique({
        where: { id },
    });
};
exports.getProductByIdRepo = getProductByIdRepo;
const updateProductRepo = async (id, data // Usamos el tipo de Prisma para actualizaciones
) => {
    return await client_1.default.product.update({
        where: { id },
        data,
    });
};
exports.updateProductRepo = updateProductRepo;
const deleteProductRepo = async (id) => {
    return await client_1.default.product.delete({
        where: { id },
    });
};
exports.deleteProductRepo = deleteProductRepo;
