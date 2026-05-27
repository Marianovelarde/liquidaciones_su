"use strict";
// src/services/auth.service.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_repository_1 = require("../repository/auth.repository");
const loginService = async (username, password) => {
    const user = await (0, auth_repository_1.findUserByUsernameRepo)(username);
    if (!user) {
        throw new Error("Usuario no encontrado");
    }
    // comparar password hasheada
    const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
 
    if (!isPasswordValid) {
        throw new Error("Contraseña incorrecta");
    }
    // generar token
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        username: user.username,
        role: user.role,
    }, process.env.JWT_SECRET || "secret_dev", {
        expiresIn: "8h",
    });
    return {
        user: {
            id: user.id,
            username: user.username,
            role: user.role,
        },
        token,
    };
};
exports.loginService = loginService;
