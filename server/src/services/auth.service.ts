// src/services/auth.service.ts

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { findUserByUsernameRepo } from "../repository/auth.repository";

export const loginService = async (
  username: string,
  password: string
) => {
  const user = await findUserByUsernameRepo(username);

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  // comparar password hasheada
const isPasswordValid = await bcrypt.compare(
  password,
  user.password
);
console.log("PASSWORD FRONT:", password);
console.log("PASSWORD DB:", user.password);
console.log("COMPARE RESULT:", isPasswordValid);

  if (!isPasswordValid) {
    throw new Error("Contraseña incorrecta");
  }

  // generar token
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET || "secret_dev",
    {
      expiresIn: "8h",
    }
  );

  return {
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    token,
  };
};