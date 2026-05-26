// src/api/auth.api.ts
import axios from "axios";

// Creamos una instancia dedicada exclusivamente a este backend
const api = axios.create({
  baseURL: "http://192.168.1.7:3002/api"
});

export const loginRequest = (data: {
  username: string;
  password: string;
}) => {
  // Al usar api.post, garantizamos que vaya a la base URL con el método POST
  return api.post("/login", data);
};