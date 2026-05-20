// src/middlewares/auth.middleware.ts

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../prisma/client";

interface JwtPayload {
  id: number;
  username: string;
  role: "ADMIN" | "GENERADOR" | "COBRADOR";
}

export const authMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
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

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret_dev"
    ) as JwtPayload;

    const user = await prisma.user.findUnique({
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
  } catch (error) {
    return res.status(401).json({
      error: "Token expirado o inválido",
    });
  }
};