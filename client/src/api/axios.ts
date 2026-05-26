import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.7:3002/api",
});

api.interceptors.request.use((config) => {

  const auth = localStorage.getItem("auth");

  if (auth) {

    const parsedAuth = JSON.parse(auth);

    if (parsedAuth.token) {

      config.headers.Authorization =
        `Bearer ${parsedAuth.token}`;
    }
  }

  return config;
});

export default api;