import axios from "axios";

const API_URL = "http://localhost:3001/api/liquidaciones";

export const createLiquidation = (data: any) => {
  return axios.post(API_URL, data);
};




  export const getLiquidations = () => {
  return axios.get(API_URL);
}

export const getLiquidationById = (id: number) => {
  return axios.get(`${API_URL}/${id}`);
};

export const updateLiquidation = (
  id: number,
  data: any
) => {
  return axios.put(`${API_URL}/${id}`, data);
};

export const changeLiquidationStatus = (
  id: number,
  status: string
) => {
  return axios.patch(
    `${API_URL}/${id}/status`,
    { status }
  );
};