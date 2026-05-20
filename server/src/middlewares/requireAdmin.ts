// src/middlewares/requireAdmin.ts

import { Response, NextFunction } from "express";

export const requireAdmin = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({
      error: "Acceso solo para administradores",
    });
  }

  next();
};