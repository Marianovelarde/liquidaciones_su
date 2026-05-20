import {
  createAuditLogRepository,
  getAuditLogsRepository,
} from "../repository/audit.repository";

export const createAuditLogService = async (
  data: any
) => {
  return createAuditLogRepository(data);
};

export const getAuditLogsService = async () => {
  return getAuditLogsRepository();
};