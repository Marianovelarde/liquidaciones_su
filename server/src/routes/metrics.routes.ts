import { Router } from "express";
import {
  getSystemMetrics,
} from "../controllers/metrics.controller";

import {authMiddleware} from "../middlewares/auth.middleware";

const router = Router();

router.get(
  "/",
  authMiddleware,
  getSystemMetrics
);

export default router;