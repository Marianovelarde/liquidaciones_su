"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryRepo = exports.updateCategoryRepo = exports.createCategoryRepo = exports.getCategoryByNameRepo = exports.getAllCategoriesRepo = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const getAllCategoriesRepo = async () => {
    return await client_1.default.category.findMany({
        where: {
            deletedAt: null,
        },
        orderBy: {
            name: "asc",
        },
    });
};
exports.getAllCategoriesRepo = getAllCategoriesRepo;
const getCategoryByNameRepo = async (name) => {
    return await client_1.default.category.findUnique({
        where: {
            name,
        },
    });
};
exports.getCategoryByNameRepo = getCategoryByNameRepo;
const createCategoryRepo = async (data) => {
    return await client_1.default.category.create({
        data,
    });
};
exports.createCategoryRepo = createCategoryRepo;
const updateCategoryRepo = async (id, data) => {
    return await client_1.default.category.update({
        where: { id },
        data,
    });
};
exports.updateCategoryRepo = updateCategoryRepo;
const deleteCategoryRepo = async (id) => {
    return await client_1.default.category.update({
        where: { id },
        data: {
            deletedAt: new Date(),
        },
    });
};
exports.deleteCategoryRepo = deleteCategoryRepo;
