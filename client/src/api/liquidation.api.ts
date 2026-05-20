import api from "./axios";

export const createLiquidation = (data: any) => {
  return api.post("/liquidaciones", data);
};

export const getLiquidations = () => {
  return api.get("/liquidaciones");
};

export const getLiquidationById = (id: number) => {
  return api.get(`/liquidaciones/${id}`);
};

export const updateLiquidation = (id: number, data: any) => {
  return api.put(`/liquidaciones/${id}`, data);
};

export const changeLiquidationStatus = (
  id: number,
  status: string
) => {
  return api.patch(`/liquidaciones/${id}/status`, {
    status,
  });
};
export const deleteLiquidation = (
  id: number
) => {
  return api.delete(`/liquidaciones/${id}`);
};