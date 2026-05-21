"use strict";
// src/controllers/auth.controller.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const auth_service_1 = require("../services/auth.service");
const loginController = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                error: "username y password son obligatorios",
            });
        }
        const result = await (0, auth_service_1.loginService)(username, password);
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(400).json({
            error: error.message || "Error en login",
        });
    }
};
exports.loginController = loginController;
