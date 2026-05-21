"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSystemMetricsRepo = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const getSystemMetricsRepo = async () => {
    //////////////////////////////////////////////////////
    // MÉTRICAS PRINCIPALES
    //////////////////////////////////////////////////////
    const totalLiquidations = await client_1.default.liquidation.count();
    const totalM2 = await client_1.default.liquidation.aggregate({
        _sum: {
            superficie: true,
        },
    });
    const totalAmount = await client_1.default.liquidation.aggregate({
        _sum: {
            total: true,
        },
    });
    //////////////////////////////////////////////////////
    // PAGADAS
    //////////////////////////////////////////////////////
    const paidLiquidations = await client_1.default.liquidation.count({
        where: {
            status: "PAGADO",
        },
    });
    const paidAmount = await client_1.default.liquidation.aggregate({
        where: {
            status: "PAGADO",
        },
        _sum: {
            total: true,
        },
    });
    //////////////////////////////////////////////////////
    // PENDIENTES
    //////////////////////////////////////////////////////
    const pendingLiquidations = await client_1.default.liquidation.count({
        where: {
            status: "PENDIENTE_DE_PAGO",
        },
    });
    //////////////////////////////////////////////////////
    // PROMEDIO
    //////////////////////////////////////////////////////
    const averageAmount = await client_1.default.liquidation.aggregate({
        _avg: {
            total: true,
        },
    });
    //////////////////////////////////////////////////////
    // ÚLTIMA LIQUIDACIÓN
    //////////////////////////////////////////////////////
    const lastLiquidation = await client_1.default.liquidation.findFirst({
        orderBy: {
            createdAt: "desc",
        },
        select: {
            id: true,
            emissionNumber: true,
            propietario: true,
            total: true,
            createdAt: true,
        },
    });
    //////////////////////////////////////////////////////
    // RETURN
    //////////////////////////////////////////////////////
    return {
        totalLiquidations,
        totalM2: totalM2._sum.superficie || 0,
        totalAmount: totalAmount._sum.total || 0,
        paidLiquidations,
        paidAmount: paidAmount._sum.total || 0,
        pendingLiquidations,
        averageAmount: averageAmount._avg.total || 0,
        lastLiquidation,
    };
};
exports.getSystemMetricsRepo = getSystemMetricsRepo;
