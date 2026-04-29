import axios from "axios";

const API_URL = "http://localhost:3001/api/usuarios";

//////////////////////////////////////////////////////
// GET ALL
//////////////////////////////////////////////////////
export const getUsers = () => {
  return axios.get(API_URL);
}

//////////////////////////////////////////////////////
// CREATE
//////////////////////////////////////////////////////
export const createUser = (data: {
  username: string;
  password: string;
  role: "ADMIN" | "GENERADOR" | "COBRADOR";
}) => {
  return axios.post(API_URL, data);
}

export const updateUser = (id: number, data: {
  username?: string;
  password?: string;
    role?: "ADMIN" | "GENERADOR" | "COBRADOR";
}) => {
  return axios.put(`${API_URL}/${id}`, data);
}

export const deleteUser = (id: number) => {
  return axios.delete(`${API_URL}/${id}`);
}
