"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuditLogsRepository = exports.createAuditLogRepository = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const createAuditLogRepository = (data) => {
    return client_1.default.auditLog.create({
        data,
    });
};
exports.createAuditLogRepository = createAuditLogRepository;
const getAuditLogsRepository = () => {
    return client_1.default.auditLog.findMany({
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                    role: true,
                },
            },
            liquidation: {
                select: {
                    id: true,
                    emissionNumber: true,
                    propietario: true,
                    ubicacion: true,
                    status: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
exports.getAuditLogsRepository = getAuditLogsRepository;
