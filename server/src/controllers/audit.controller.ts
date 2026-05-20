import { Request, Response } from "express";

import {
  getAuditLogsService,
} from "../services/audit.service";

export const getAuditLogs = async (
  req: Request,
  res: Response
) => {
  try {
    const logs = await getAuditLogsService();

    res.json(logs);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error obteniendo auditoría",
    });
  }
};