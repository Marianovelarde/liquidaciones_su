import prisma from "../prisma/client";

export const createUserRepo = async (data: {
  username: string;
  password: string;
  role: "ADMIN" | "GENERADOR" | "COBRADOR";
}) => {
    return await prisma.user.create({
        data,
    });
}


export const getAllUsersRepo = async () => {
  return await prisma.user.findMany({
  select: {
    id: true,
    username: true,
    role: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  },
});
}

export const getUserByIdRepo = async (id: number) => {
    return await prisma.user.findUnique({
        where: {
            id,
        },
    });
}

export const updateUserRepo = async (id: number, data: {
    username?: string;
    password?: string;
    role?: "ADMIN" | "GENERADOR" | "COBRADOR";
}) => {
    return await prisma.user.update({
        where: {
            id,
        },
        data,
    });
}

export const deleteUserRepo = async (id: number) => {
    return await prisma.user.delete({
        where: {
            id,
        },
    });
}