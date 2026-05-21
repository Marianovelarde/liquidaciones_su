"use strict";
// src/middlewares/requireAdmin.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = void 0;
const requireAdmin = (req, res, next) => {
    if (req.user.role !== "ADMIN") {
        return res.status(403).json({
            error: "Acceso solo para administradores",
        });
    }
    next();
};
exports.requireAdmin = requireAdmin;
