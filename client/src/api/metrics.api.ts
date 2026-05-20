import axios from "./axios";

export const getSystemMetrics = async () => {
  const res = await axios.get("/metricas");

  return res.data;
};