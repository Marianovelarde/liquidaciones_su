"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuditLogs = void 0;
const audit_service_1 = require("../services/audit.service");
const getAuditLogs = async (req, res) => {
    try {
        const logs = await (0, audit_service_1.getAuditLogsService)();
        res.json(logs);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error obteniendo auditoría",
        });
    }
};
exports.getAuditLogs = getAuditLogs;
