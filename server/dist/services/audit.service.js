"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuditLogsService = exports.createAuditLogService = void 0;
const audit_repository_1 = require("../repository/audit.repository");
const createAuditLogService = async (data) => {
    return (0, audit_repository_1.createAuditLogRepository)(data);
};
exports.createAuditLogService = createAuditLogService;
const getAuditLogsService = async () => {
    return (0, audit_repository_1.getAuditLogsRepository)();
};
exports.getAuditLogsService = getAuditLogsService;
