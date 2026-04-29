// src/controllers/user.controller.ts

import { Request, Response } from "express";

import {
  createUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
} from "../services/user.service";

//////////////////////////////////////////////////////
// CREATE
//////////////////////////////////////////////////////

export const createUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      return res.status(400).json({
        error: "username, password y role son obligatorios",
      });
    }

    const user = await createUserService({
      username,
      password,
      role,
    });

    return res.status(201).json(user);
  } catch (error: any) {
    return res.status(400).json({
      error: error.message || "Error al crear usuario",
    });
  }
};

//////////////////////////////////////////////////////
// GET ALL
//////////////////////////////////////////////////////

export const getAllUsersController = async (
  _req: Request,
  res: Response
) => {
  try {
    const users = await getAllUsersService();

    return res.json(users);
  } catch (error: any) {
    return res.status(500).json({
      error: error.message || "Error obteniendo usuarios",
    });
  }
};

//////////////////////////////////////////////////////
// GET BY ID
//////////////////////////////////////////////////////

export const getUserByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    if (!id) {
      return res.status(400).json({
        error: "ID inválido",
      });
    }

    const user = await getUserByIdService(id);

    if (!user) {
      return res.status(404).json({
        error: "Usuario no encontrado",
      });
    }

    return res.json(user);
  } catch (error: any) {
    return res.status(400).json({
      error: error.message || "Error obteniendo usuario",
    });
  }
};

//////////////////////////////////////////////////////
// UPDATE
//////////////////////////////////////////////////////

export const updateUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    if (!id) {
      return res.status(400).json({
        error: "ID inválido",
      });
    }

    const { username, password, role } = req.body;

    const updatedUser = await updateUserService(id, {
      username,
      password,
      role,
    });

    return res.json(updatedUser);
  } catch (error: any) {
    return res.status(400).json({
      error: error.message || "Error actualizando usuario",
    });
  }
};

//////////////////////////////////////////////////////
// DELETE
//////////////////////////////////////////////////////

export const deleteUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    if (!id) {
      return res.status(400).json({
        error: "ID inválido",
      });
    }

    await deleteUserService(id);

    return res.json({
      message: "Usuario eliminado correctamente",
    });
  } catch (error: any) {
    return res.status(400).json({
      error: error.message || "Error eliminando usuario",
    });
  }
};