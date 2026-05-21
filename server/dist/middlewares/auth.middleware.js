"use strict";
// src/middlewares/auth.middleware.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = __importDefault(require("../prisma/client"));
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                error: "No autorizado",
            });
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                error: "Token inválido",
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "secret_dev");
        const user = await client_1.default.user.findUnique({
            where: {
                id: decoded.id,
            },
        });
        if (!user || user.deletedAt) {
            return res.status(401).json({
                error: "Usuario inválido",
            });
        }
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json({
            error: "Token expirado o inválido",
        });
    }
};
exports.authMiddleware = authMiddleware;
