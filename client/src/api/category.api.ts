// src/api/category.api.ts

import axios from "axios";

const API_URL =  "http://192.168.1.7:3002/api/categorias";

//////////////////////////////////////////////////////
// GET ALL
//////////////////////////////////////////////////////

export const getCategories = () => {
  return axios.get(API_URL);
};

//////////////////////////////////////////////////////
// CREATE
//////////////////////////////////////////////////////

export const createCategory = (data: {
  name: string;
  coefficient: number;
  pricePerM2: number;
}) => {
  return axios.post(API_URL, data);
};

//////////////////////////////////////////////////////
// UPDATE
//////////////////////////////////////////////////////

export const updateCategory = (
  id: number,
  data: {
    name?: string;
    coefficient?: number;
    pricePerM2?: number;
  }
) => {
  return axios.put(`${API_URL}/${id}`, data);
};

//////////////////////////////////////////////////////
// DELETE LÓGICO
//////////////////////////////////////////////////////

export const deleteCategory = (id: number) => {
  return axios.patch(`${API_URL}/${id}/delete`);
};