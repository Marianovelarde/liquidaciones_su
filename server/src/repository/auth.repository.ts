// src/repository/auth.repository.ts

import prisma from "../prisma/client";

export const findUserByUsernameRepo = async (
  username: string
) => {
  return await prisma.user.findFirst({
    where: {
      username,
      deletedAt: null,
    },
  });
};