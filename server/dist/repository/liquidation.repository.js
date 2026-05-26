"use strict";
// src/repository/liquidation.repository.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeLiquidationStatusRepo = exports.deleteLiquidationRepo = exports.updateLiquidationRepo = exports.getLiquidationByIdRepo = exports.getAllLiquidationsRepo = exports.createLiquidationRepo = void 0;
const client_1 = __importDefault(require("../prisma/client"));
// CREATE
const createLiquidationRepo = async (data) => {
    return await client_1.default.liquidation.create({
        data,
        include: {
            category: true,
        },
    });
};
exports.createLiquidationRepo = createLiquidationRepo;
// GET ALL
const getAllLiquidationsRepo = async () => {
    return await client_1.default.liquidation.findMany({
        include: {
            category: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
exports.getAllLiquidationsRepo = getAllLiquidationsRepo;
// GET BY ID
const getLiquidationByIdRepo = async (id) => {
    return await client_1.default.liquidation.findUnique({
        where: {
            id,
        },
        include: {
            category: true,
        },
    });
};
exports.getLiquidationByIdRepo = getLiquidationByIdRepo;
// UPDATE
const updateLiquidationRepo = async (id, data) => {
    return await client_1.default.liquidation.update({
        where: { id },
        data: {
            propietario: data.propietario,
            ubicacion: data.ubicacion,
            superficie: Number(data.superficie),
            total: Number(data.total),
            status: data.status,
            receiptNumber: data.receiptNumber
        },
        include: {
            category: true,
        },
    });
};
exports.updateLiquidationRepo = updateLiquidationRepo;
// DELETE
const deleteLiquidationRepo = async (id) => {
    return await client_1.default.liquidation.delete({
        where: {
            id,
        },
    });
};
exports.deleteLiquidationRepo = deleteLiquidationRepo;
const changeLiquidationStatusRepo = async (id, status) => {
    return await client_1.default.liquidation.update({
        where: { id },
        data: {
            status,
        },
        include: {
            category: true,
        },
    });
};
exports.changeLiquidationStatusRepo = changeLiquidationStatusRepo;
