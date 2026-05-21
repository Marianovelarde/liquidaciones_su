"use strict";
// src/middlewares/requireRoles.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRoles = void 0;
const requireRoles = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                error: "No autenticado",
            });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                error: "No autorizado",
            });
        }
        next();
    };
};
exports.requireRoles = requireRoles;
