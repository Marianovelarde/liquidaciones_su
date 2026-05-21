"use strict";
// src/services/liquidation.services.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeLiquidationStatusService = exports.deleteLiquidationService = exports.updateLiquidationService = exports.getLiquidationByIdService = exports.getAllLiquidationsService = exports.createLiquidationService = void 0;
const liquidation_repository_1 = require("../repository/liquidation.repository");
const client_1 = require("@prisma/client");
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
    if (!data.categoryId) {
        throw new Error("Debe seleccionar una categoría");
    }
    if (!data.emissionNumber) {
        throw new Error("El número de liquidación es obligatorio");
    }
    if (data.hasSurcharge &&
        !data.surchargePercent) {
        throw new Error("Debe ingresar el porcentaje de recargo");
    }
    //////////////////////////////////////////////////////
    // CREAR LIQUIDACIÓN
    //////////////////////////////////////////////////////
    const createdLiquidation = await (0, liquidation_repository_1.createLiquidationRepo)(data);
    //////////////////////////////////////////////////////
    // AUDITORÍA
    //////////////////////////////////////////////////////
    await (0, audit_service_1.createAuditLogService)({
        userId: user.id,
        userRole: user.role,
        liquidationId: createdLiquidation.id,
        action: client_1.AuditAction.CREATE,
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
    const oldLiquidation = await (0, exports.getLiquidationByIdService)(id);
    //////////////////////////////////////////////////////
    // UPDATE
    //////////////////////////////////////////////////////
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
            action: client_1.AuditAction.UPDATE,
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
        action: client_1.AuditAction.DELETE,
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
        action: client_1.AuditAction.STATUS_CHANGE,
        field: "status",
        oldValue: `Liquidación #${oldLiquidation.emissionNumber} - ${oldLiquidation.status}`,
        newValue: `Liquidación #${updatedLiquidation.emissionNumber} - ${updatedLiquidation.status}`,
        ipAddress,
    });
    return updatedLiquidation;
};
exports.changeLiquidationStatusService = changeLiquidationStatusService;
