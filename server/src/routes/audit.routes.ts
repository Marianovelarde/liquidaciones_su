import { Router } from "express";

import { getAuditLogs } from "../controllers/audit.controller";

import { authMiddleware } from "../middlewares/auth.middleware";
import { requireAdmin } from "../middlewares/requireAdmin";

const router = Router();

router.get(
  "/",
  authMiddleware,
  requireAdmin,
  getAuditLogs
);

export default router;