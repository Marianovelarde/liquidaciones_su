"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserRepo = exports.updateUserRepo = exports.getUserByIdRepo = exports.getAllUsersRepo = exports.createUserRepo = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const createUserRepo = async (data) => {
    return await client_1.default.user.create({
        data,
    });
};
exports.createUserRepo = createUserRepo;
const getAllUsersRepo = async () => {
    return await client_1.default.user.findMany({
        select: {
            id: true,
            username: true,
            role: true,
            createdAt: true,
            updatedAt: true,
            deletedAt: true,
        },
    });
};
exports.getAllUsersRepo = getAllUsersRepo;
const getUserByIdRepo = async (id) => {
    return await client_1.default.user.findUnique({
        where: {
            id,
        },
    });
};
exports.getUserByIdRepo = getUserByIdRepo;
const updateUserRepo = async (id, data) => {
    return await client_1.default.user.update({
        where: {
            id,
        },
        data,
    });
};
exports.updateUserRepo = updateUserRepo;
const deleteUserRepo = async (id) => {
    return await client_1.default.user.delete({
        where: {
            id,
        },
    });
};
exports.deleteUserRepo = deleteUserRepo;
