// src/services/liquidation.services.ts

import {
  createLiquidationRepo,
  getAllLiquidationsRepo,
  getLiquidationByIdRepo,
  updateLiquidationRepo,
  deleteLiquidationRepo,
  changeLiquidationStatusRepo
} from "../repository/liquidation.repository";

import {
  CreateLiquidationDTO,
  UpdateLiquidationDTO,
} from "../dtos/liquidation.dto";

import { LiquidationStatus } from "@prisma/client";


// CREATE
export const createLiquidationService = async (
  data: CreateLiquidationDTO
) => {
  // validación simple importante
  if (!data.propietario) {
    throw new Error("El propietario es obligatorio");
  }

  if (!data.categoryId) {
    throw new Error("Debe seleccionar una categoría");
  }

  if (!data.emissionNumber) {
    throw new Error("El número de liquidación es obligatorio");
  }

  // si tiene recargo pero no porcentaje
  if (data.hasSurcharge && !data.surchargePercent) {
    throw new Error("Debe ingresar el porcentaje de recargo");
  }

  return await createLiquidationRepo(data);
};


// GET ALL
export const getAllLiquidationsService = async () => {
  return await getAllLiquidationsRepo();
};


// GET BY ID
export const getLiquidationByIdService = async (id: number) => {
  const liquidation = await getLiquidationByIdRepo(id);

  if (!liquidation) {
    throw new Error("Liquidación no encontrada");
  }

  return liquidation;
};


// UPDATE
export const updateLiquidationService = async (
  id: number,
  data: UpdateLiquidationDTO
) => {
  await getLiquidationByIdService(id);

  return await updateLiquidationRepo(id, data);
};


// DELETE
export const deleteLiquidationService = async (id: number) => {
  await getLiquidationByIdService(id);

  return await deleteLiquidationRepo(id);
};

export const changeLiquidationStatusService = async (
  id: number,
  status: LiquidationStatus
) => {
  const changeLiquidation = await changeLiquidationStatusRepo(
    id,
    status
  );

  if (!changeLiquidation) {
    throw new Error(
      "No se pudo cambiar el estado de la liquidación"
    );
  }

  return changeLiquidation;
};