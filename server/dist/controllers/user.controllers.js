"use strict";
// src/controllers/user.controller.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserController = exports.updateUserController = exports.getUserByIdController = exports.getAllUsersController = exports.createUserController = void 0;
const user_service_1 = require("../services/user.service");
//////////////////////////////////////////////////////
// CREATE
//////////////////////////////////////////////////////
const createUserController = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        if (!username || !password || !role) {
            return res.status(400).json({
                error: "username, password y role son obligatorios",
            });
        }
        const user = await (0, user_service_1.createUserService)({
            username,
            password,
            role,
        });
        return res.status(201).json(user);
    }
    catch (error) {
        return res.status(400).json({
            error: error.message || "Error al crear usuario",
        });
    }
};
exports.createUserController = createUserController;
//////////////////////////////////////////////////////
// GET ALL
//////////////////////////////////////////////////////
const getAllUsersController = async (_req, res) => {
    try {
        const users = await (0, user_service_1.getAllUsersService)();
        return res.json(users);
    }
    catch (error) {
        return res.status(500).json({
            error: error.message || "Error obteniendo usuarios",
        });
    }
};
exports.getAllUsersController = getAllUsersController;
//////////////////////////////////////////////////////
// GET BY ID
//////////////////////////////////////////////////////
const getUserByIdController = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!id) {
            return res.status(400).json({
                error: "ID inválido",
            });
        }
        const user = await (0, user_service_1.getUserByIdService)(id);
        if (!user) {
            return res.status(404).json({
                error: "Usuario no encontrado",
            });
        }
        return res.json(user);
    }
    catch (error) {
        return res.status(400).json({
            error: error.message || "Error obteniendo usuario",
        });
    }
};
exports.getUserByIdController = getUserByIdController;
//////////////////////////////////////////////////////
// UPDATE
//////////////////////////////////////////////////////
const updateUserController = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!id) {
            return res.status(400).json({
                error: "ID inválido",
            });
        }
        const { username, password, role } = req.body;
        const updatedUser = await (0, user_service_1.updateUserService)(id, {
            username,
            password,
            role,
        });
        return res.json(updatedUser);
    }
    catch (error) {
        return res.status(400).json({
            error: error.message || "Error actualizando usuario",
        });
    }
};
exports.updateUserController = updateUserController;
//////////////////////////////////////////////////////
// DELETE
//////////////////////////////////////////////////////
const deleteUserController = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!id) {
            return res.status(400).json({
                error: "ID inválido",
            });
        }
        await (0, user_service_1.deleteUserService)(id);
        return res.json({
            message: "Usuario eliminado correctamente",
        });
    }
    catch (error) {
        return res.status(400).json({
            error: error.message || "Error eliminando usuario",
        });
    }
};
exports.deleteUserController = deleteUserController;
