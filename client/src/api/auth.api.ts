// src/api/auth.api.ts

import axios from "axios";

const API_URL = "http://192.168.1.7:3002/api/login"

export const loginRequest = (data: {
  username: string;
  password: string;
}) => {
  return axios.post(`${API_URL}`, data);
};