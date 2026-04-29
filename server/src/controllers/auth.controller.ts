// src/controllers/auth.controller.ts

import { Request, Response } from "express";
import { loginService } from "../services/auth.service";

export const loginController = async (
  req: Request,
  res: Response
) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: "username y password son obligatorios",
      });
    }

    const result = await loginService(
      username,
      password
    );

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      error: error.message || "Error en login",
    });
  }
};