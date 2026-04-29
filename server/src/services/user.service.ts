import {
    createUserRepo,
    getAllUsersRepo,
    getUserByIdRepo,
    updateUserRepo,
    deleteUserRepo,
} from "../repository/user.repository";
import bcrypt from "bcrypt";

export const createUserService = async (data: {
  username: string;
  password: string;
  role: "ADMIN" | "GENERADOR" | "COBRADOR";
}) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return await createUserRepo({
    ...data,
    password: hashedPassword,
  });
};
export const getAllUsersService = async () => {
    return await getAllUsersRepo();
}

export const getUserByIdService = async (id: number) => {
    return await getUserByIdRepo(id);
}

export const updateUserService = async (
  id: number,
  data: {
    username?: string;
    password?: string;
    role?: "ADMIN" | "GENERADOR" | "COBRADOR";
  }
) => {
  // si viene password nueva → hashear
  if (data.password) {
    data.password = await bcrypt.hash(
      data.password,
      10
    );
  }

  return await updateUserRepo(id, data);
};

export const deleteUserService = async (id: number) => {
    return await deleteUserRepo(id);
}
