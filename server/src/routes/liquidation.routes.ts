// src/routes/liquidation.routes.ts

import { Router } from "express";

import {
  createLiquidation,
  getAllLiquidations,
  getLiquidationById,
  updateLiquidation,
  deleteLiquidation,
  changeLiquidationStatus,
} from "../controllers/liquidation.controller";

import {authMiddleware} from '../middlewares/auth.middleware'
import { requireRoles } from "../middlewares/requireRoles";
import {requireAdmin} from "../middlewares/requireAdmin";
const router = Router();

//////////////////////////////////////////////////////
// CREATE
//////////////////////////////////////////////////////

router.post(
  "/",
  authMiddleware,
  requireRoles(["ADMIN", "GENERADOR"]),
  createLiquidation
);

// GET ALL → TODOS
router.get(
  "/",
  authMiddleware,
  requireRoles(["ADMIN", "COBRADOR", "GENERADOR"]),
  getAllLiquidations
);

// PATCH STATUS → TODOS
router.patch(
  "/:id/status",
  authMiddleware,
  requireRoles(["ADMIN", "COBRADOR", "GENERADOR"]),
  changeLiquidationStatus
);

// GET BY ID → TODOS
router.get(
  "/:id",
  authMiddleware,
  requireRoles(["ADMIN", "COBRADOR", "GENERADOR"]),
  getLiquidationById
);

// UPDATE COMPLETO → SOLO ADMIN
router.put(
  "/:id",
  authMiddleware,
  requireAdmin,
  updateLiquidation
);

// DELETE → SOLO ADMIN
router.delete(
  "/:id",
  authMiddleware,
  requireAdmin,
  deleteLiquidation
);

export default router;