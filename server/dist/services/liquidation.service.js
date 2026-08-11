"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeLiquidationStatusService = exports.deleteLiquidationService = exports.updateLiquidationService = exports.getLiquidationByIdService = exports.getAllLiquidationsService = exports.createLiquidationService = void 0;
// src/services/liquidation.services.ts
const client_1 = __importDefault(require("../prisma/client"));
const liquidation_repository_1 = require("../repository/liquidation.repository");
const client_2 = require("@prisma/client");
const audit_service_1 = require("./audit.service");
//////////////////////////////////////////////////////
// CREATE
//////////////////////////////////////////////////////
const createLiquidationService = async (data, user, ipAddress) => {
    //////////////////////////////////////////////////////
    // VALIDACIONES
    //////////////////////////////////////////////////////
    if (!data.propietario) {
        throw new Error("El propietario es obligatorio");
    }
    if (!data.cuil) {
        throw new Error("El CUIL es obligatorio");
    }
    if (!data.categoryId) {
        throw new Error("Debe seleccionar una categoría");
    }
    if (!data.emissionNumber) {
        throw new Error("El número de liquidación es obligatorio");
    }
    //////////////////////////////////////////////////////
    // VALIDACIONES DE RECARGO
    //////////////////////////////////////////////////////
    if (data.hasSurcharge) {
        if (data.surchargePercent == null) {
            throw new Error("Debe ingresar el porcentaje de recargo");
        }
        if (data.isFullSurcharge === undefined) {
            throw new Error("Debe indicar si el recargo aplica a toda la superficie.");
        }
        if (!data.isFullSurcharge &&
            (data.surchargeSurface === undefined ||
                data.surchargeSurface <= 0)) {
            throw new Error("Debe ingresar la superficie afectada por el recargo.");
        }
        if (!data.isFullSurcharge &&
            data.surchargeSurface > data.superficie) {
            throw new Error("La superficie con recargo no puede superar la superficie total.");
        }
    }
    //////////////////////////////////////////////////////
    // CREAR LIQUIDACIÓN
    //////////////////////////////////////////////////////
    const createdLiquidation = await (0, liquidation_repository_1.createLiquidationRepo)(data);
    console.log("createdLiquidation", data);
    //////////////////////////////////////////////////////
    // AUDITORÍA
    //////////////////////////////////////////////////////
    await (0, audit_service_1.createAuditLogService)({
        userId: user.id,
        userRole: user.role,
        liquidationId: createdLiquidation.id,
        action: client_2.AuditAction.CREATE,
        field: null,
        oldValue: null,
        newValue: `Liquidación #${createdLiquidation.emissionNumber} creada`,
        ipAddress,
    });
    return createdLiquidation;
};
exports.createLiquidationService = createLiquidationService;
//////////////////////////////////////////////////////
// GET ALL
//////////////////////////////////////////////////////
const getAllLiquidationsService = async () => {
    return await (0, liquidation_repository_1.getAllLiquidationsRepo)();
};
exports.getAllLiquidationsService = getAllLiquidationsService;
//////////////////////////////////////////////////////
// GET BY ID
//////////////////////////////////////////////////////
const getLiquidationByIdService = async (id) => {
    const liquidation = await (0, liquidation_repository_1.getLiquidationByIdRepo)(id);
    if (!liquidation) {
        throw new Error("Liquidación no encontrada");
    }
    return liquidation;
};
exports.getLiquidationByIdService = getLiquidationByIdService;
//////////////////////////////////////////////////////
// UPDATE
//////////////////////////////////////////////////////
const updateLiquidationService = async (id, data, user, ipAddress) => {
    //////////////////////////////////////////////////////
    // ORIGINAL
    //////////////////////////////////////////////////////
    var _a, _b, _c, _d, _e, _f;
    const oldLiquidation = await (0, exports.getLiquidationByIdService)(id);
    //////////////////////////////////////////////////////
    // UPDATE
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    // OBTENER CATEGORÍA
    //////////////////////////////////////////////////////
    const category = await client_1.default.category.findUnique({
        where: {
            id: (_a = data.categoryId) !== null && _a !== void 0 ? _a : oldLiquidation.categoryId,
        },
    });
    if (!category) {
        throw new Error("Categoría no encontrada");
    }
    //////////////////////////////////////////////////////
    // RECALCULAR TOTAL
    //////////////////////////////////////////////////////
    const superficie = Number((_b = data.superficie) !== null && _b !== void 0 ? _b : oldLiquidation.superficie);
    const subtotal = superficie *
        category.coefficient *
        category.pricePerM2;
    let surchargeValue = 0;
    const hasSurcharge = (_c = data.hasSurcharge) !== null && _c !== void 0 ? _c : oldLiquidation.hasSurcharge;
    if (hasSurcharge) {
        const surchargePercent = Number((_d = data.surchargePercent) !== null && _d !== void 0 ? _d : oldLiquidation.surchargePercent);
        const isFullSurcharge = (_e = data.isFullSurcharge) !== null && _e !== void 0 ? _e : oldLiquidation.isFullSurcharge;
        const surchargeSurface = isFullSurcharge
            ? superficie
            : Number((_f = data.surchargeSurface) !== null && _f !== void 0 ? _f : oldLiquidation.surchargeSurface);
        const surchargeSubtotal = surchargeSurface *
            category.coefficient *
            category.pricePerM2;
        surchargeValue =
            surchargeSubtotal *
                surchargePercent /
                100;
        data.isFullSurcharge = isFullSurcharge !== null && isFullSurcharge !== void 0 ? isFullSurcharge : false;
        data.surchargeSurface = surchargeSurface;
        data.surchargePercent = surchargePercent;
    }
    const total = subtotal + surchargeValue;
    // Lo enviamos al repository
    data.total = total;
    const updatedLiquidation = await (0, liquidation_repository_1.updateLiquidationRepo)(id, data);
    //////////////////////////////////////////////////////
    // DETECTAR CAMBIOS
    //////////////////////////////////////////////////////
    const changedFields = Object.keys(data);
    //////////////////////////////////////////////////////
    // CREAR AUDITORÍA POR CAMPO
    //////////////////////////////////////////////////////
    for (const field of changedFields) {
        const oldValue = oldLiquidation[field];
        const newValue = updatedLiquidation[field];
        //////////////////////////////////////////////////////
        // EVITAR LOGS INNECESARIOS
        //////////////////////////////////////////////////////
        if (String(oldValue) === String(newValue)) {
            continue;
        }
        await (0, audit_service_1.createAuditLogService)({
            userId: user.id,
            userRole: user.role,
            liquidationId: updatedLiquidation.id,
            action: client_2.AuditAction.UPDATE,
            field,
            oldValue: String(oldValue),
            newValue: String(newValue),
            ipAddress,
        });
    }
    return updatedLiquidation;
};
exports.updateLiquidationService = updateLiquidationService;
//////////////////////////////////////////////////////
// DELETE
//////////////////////////////////////////////////////
const deleteLiquidationService = async (id, user, ipAddress) => {
    //////////////////////////////////////////////////////
    // OBTENER ORIGINAL
    //////////////////////////////////////////////////////
    const liquidation = await (0, exports.getLiquidationByIdService)(id);
    //////////////////////////////////////////////////////
    // ELIMINAR
    //////////////////////////////////////////////////////
    await (0, liquidation_repository_1.deleteLiquidationRepo)(id);
    //////////////////////////////////////////////////////
    // AUDITORÍA
    //////////////////////////////////////////////////////
    await (0, audit_service_1.createAuditLogService)({
        userId: user.id,
        userRole: user.role,
        liquidationId: liquidation.id,
        action: client_2.AuditAction.DELETE,
        field: "LIQUIDATION",
        oldValue: `Liquidación #${liquidation.emissionNumber} eliminada`,
        newValue: null,
        ipAddress,
    });
    return {
        message: "Liquidación eliminada correctamente",
    };
};
exports.deleteLiquidationService = deleteLiquidationService;
//////////////////////////////////////////////////////
// CHANGE STATUS
//////////////////////////////////////////////////////
const changeLiquidationStatusService = async (id, status, user, ipAddress) => {
    //////////////////////////////////////////////////////
    // OBTENER ORIGINAL
    //////////////////////////////////////////////////////
    const oldLiquidation = await (0, exports.getLiquidationByIdService)(id);
    //////////////////////////////////////////////////////
    // CAMBIAR STATUS
    //////////////////////////////////////////////////////
    const updatedLiquidation = await (0, liquidation_repository_1.changeLiquidationStatusRepo)(id, status);
    if (!updatedLiquidation) {
        throw new Error("No se pudo cambiar el estado de la liquidación");
    }
    //////////////////////////////////////////////////////
    // AUDITORÍA
    //////////////////////////////////////////////////////
    await (0, audit_service_1.createAuditLogService)({
        userId: user.id,
        userRole: user.role,
        liquidationId: updatedLiquidation.id,
        action: client_2.AuditAction.STATUS_CHANGE,
        field: "status",
        oldValue: `Liquidación #${oldLiquidation.emissionNumber} - ${oldLiquidation.status}`,
        newValue: `Liquidación #${updatedLiquidation.emissionNumber} - ${updatedLiquidation.status}`,
        ipAddress,
    });
    return updatedLiquidation;
};
exports.changeLiquidationStatusService = changeLiquidationStatusService;
