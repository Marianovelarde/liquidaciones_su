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
    var _a, _b, _c;
    return await client_1.default.liquidation.create({
        data: {
            emissionNumber: data.emissionNumber,
            expedienteNumero: data.expedienteNumero,
            expedienteCodigo: data.expedienteCodigo,
            expedienteAnio: data.expedienteAnio,
            carpetaNumero: data.carpetaNumero,
            carpetaLetra: data.carpetaLetra,
            carpetaAnio: data.carpetaAnio,
            distrito: data.distrito,
            zona: data.zona,
            manzana: data.manzana,
            parcela: data.parcela,
            propietario: data.propietario,
            cuil: data.cuil,
            ubicacion: data.ubicacion,
            tipoObra: data.tipoObra,
            concepto: data.concepto,
            superficie: data.superficie,
            categoryId: data.categoryId,
            createdById: data.createdById,
            hasSurcharge: data.hasSurcharge,
            isFullSurcharge: data.hasSurcharge ? (_a = data.isFullSurcharge) !== null && _a !== void 0 ? _a : false : null,
            surchargeSurface: data.hasSurcharge
                ? (_b = data.surchargeSurface) !== null && _b !== void 0 ? _b : null
                : null,
            surchargePercent: data.hasSurcharge
                ? (_c = data.surchargePercent) !== null && _c !== void 0 ? _c : null
                : null,
            observations: data.observations,
            receiptNumber: data.receiptNumber,
            total: data.total,
        },
        include: {
            category: true,
        },
    });
};
exports.createLiquidationRepo = createLiquidationRepo;
// GET ALL
const getAllLiquidationsRepo = async () => {
    return await client_1.default.liquidation.findMany({
        where: {
            deletedAt: null,
        },
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
    return await client_1.default.liquidation.findFirst({
        where: {
            id,
            deletedAt: null,
        },
        include: {
            category: true,
        },
        orderBy: {
            createdAt: "desc"
        }
    });
};
exports.getLiquidationByIdRepo = getLiquidationByIdRepo;
// UPDATE
const updateLiquidationRepo = async (id, data) => {
    var _a;
    return await client_1.default.liquidation.update({
        where: { id },
        data: {
            propietario: data.propietario,
            cuil: data.cuil,
            ubicacion: data.ubicacion,
            concepto: data.concepto,
            tipoObra: data.tipoObra,
            expedienteNumero: data.expedienteNumero,
            expedienteCodigo: data.expedienteCodigo,
            expedienteAnio: data.expedienteAnio,
            carpetaNumero: data.carpetaNumero,
            carpetaLetra: data.carpetaLetra,
            carpetaAnio: data.carpetaAnio,
            distrito: data.distrito,
            zona: data.zona,
            manzana: data.manzana,
            parcela: data.parcela,
            superficie: data.superficie !== undefined
                ? Number(data.superficie)
                : undefined,
            categoryId: data.categoryId !== undefined
                ? Number(data.categoryId)
                : undefined,
            hasSurcharge: data.hasSurcharge,
            isFullSurcharge: data.hasSurcharge
                ? (_a = data.isFullSurcharge) !== null && _a !== void 0 ? _a : false
                : null,
            surchargeSurface: data.surchargeSurface !== undefined
                ? Number(data.surchargeSurface)
                : undefined,
            surchargePercent: data.surchargePercent !== undefined
                ? Number(data.surchargePercent)
                : undefined,
            total: data.total !== undefined
                ? Number(data.total)
                : undefined,
            status: data.status,
            receiptNumber: data.receiptNumber,
            observations: data.observations,
        }
    });
};
exports.updateLiquidationRepo = updateLiquidationRepo;
// DELETE
const deleteLiquidationRepo = async (id) => {
    return await client_1.default.liquidation.update({
        where: {
            id,
        },
        data: {
            deletedAt: new Date(),
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
