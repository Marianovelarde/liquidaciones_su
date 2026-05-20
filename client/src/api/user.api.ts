import api from "./axios";

export const getUsers = () => {
  return api.get("/usuarios");
  
};

export const createUser = (data: {
  username: string;
  password: string;
  role: "ADMIN" | "GENERADOR" | "COBRADOR";
}) => {
  return api.post("/usuarios", data);
};

export const updateUser = (id: number, data: any) => {
  return api.put(`/usuarios/${id}`, data);
};

export const deleteUser = (id: number) => {
  return api.delete(`/usuarios/${id}`);
};