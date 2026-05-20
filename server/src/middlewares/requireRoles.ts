// src/middlewares/requireRoles.ts

import { Request, Response, NextFunction, RequestHandler } from "express";

export const requireRoles = (roles: string[]): RequestHandler => {
  return (req: any, res: Response, next: NextFunction) => {
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