import { Request, Response } from "express";

import {
  getSystemMetricsService,
} from "../services/metrics.service";

export const getSystemMetrics =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const metrics =
        await getSystemMetricsService();

      res.json(metrics);

    } catch (error: any) {
      console.error(error);

      res.status(500).json({
        error:
          "Error obteniendo métricas",
      });
    }
  };