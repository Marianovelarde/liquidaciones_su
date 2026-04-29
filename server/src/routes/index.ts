import { Router } from "express";

import liquidationRoutes from "./liquidation.routes";
import categoryRoutes from "./category.routes";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
const router = Router();


router.use("/liquidaciones", liquidationRoutes);
router.use("/categorias", categoryRoutes);
router.use("/usuarios", userRoutes);
router.use("/login", authRoutes);

export default router;