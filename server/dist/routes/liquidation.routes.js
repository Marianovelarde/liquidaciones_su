"use strict";
// src/routes/liquidation.routes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const liquidation_controller_1 = require("../controllers/liquidation.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const requireRoles_1 = require("../middlewares/requireRoles");
const requireAdmin_1 = require("../middlewares/requireAdmin");
const router = (0, express_1.Router)();
//////////////////////////////////////////////////////
// CREATE
//////////////////////////////////////////////////////
router.post("/", auth_middleware_1.authMiddleware, (0, requireRoles_1.requireRoles)(["ADMIN", "GENERADOR"]), liquidation_controller_1.createLiquidation);
// GET ALL → TODOS
router.get("/", auth_middleware_1.authMiddleware, (0, requireRoles_1.requireRoles)(["ADMIN", "COBRADOR", "GENERADOR"]), liquidation_controller_1.getAllLiquidations);
// PATCH STATUS → TODOS
router.patch("/:id/status", auth_middleware_1.authMiddleware, (0, requireRoles_1.requireRoles)(["ADMIN", "COBRADOR", "GENERADOR"]), liquidation_controller_1.changeLiquidationStatus);
// GET BY ID → TODOS
router.get("/:id", auth_middleware_1.authMiddleware, (0, requireRoles_1.requireRoles)(["ADMIN", "COBRADOR", "GENERADOR"]), liquidation_controller_1.getLiquidationById);
// UPDATE COMPLETO → SOLO ADMIN
router.put("/:id", auth_middleware_1.authMiddleware, requireAdmin_1.requireAdmin, liquidation_controller_1.updateLiquidation);
// DELETE → SOLO ADMIN
router.delete("/:id", auth_middleware_1.authMiddleware, requireAdmin_1.requireAdmin, liquidation_controller_1.deleteLiquidation);
exports.default = router;
