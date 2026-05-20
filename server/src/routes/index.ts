import { Router } from "express";

import liquidationRoutes from "./liquidation.routes";
import categoryRoutes from "./category.routes";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import auditRoutes from "./audit.routes";
import metricsRoutes from "./metrics.routes";
const router = Router();


router.use("/liquidaciones", liquidationRoutes);
router.use("/categorias", categoryRoutes);
router.use("/usuarios", userRoutes);
router.use("/login", authRoutes);
router.use("/auditoria", auditRoutes);
router.use("/metricas", metricsRoutes);
export default router;