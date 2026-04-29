// src/repository/liquidation.repository.ts


import prisma from "../prisma/client";
import { LiquidationStatus } from "@prisma/client";
import {
  CreateLiquidationDTO,
  UpdateLiquidationDTO,
} from "../dtos/liquidation.dto";


// CREATE
export const createLiquidationRepo = async (
  data: CreateLiquidationDTO
) => {
  return await prisma.liquidation.create({
    data,
    include: {
      category: true,
    },
  });
};


// GET ALL
export const getAllLiquidationsRepo = async () => {
  return await prisma.liquidation.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};


// GET BY ID
export const getLiquidationByIdRepo = async (id: number) => {
  return await prisma.liquidation.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
};


// UPDATE
export const updateLiquidationRepo = async (
  id: number,
  data: any
) => {
  return await prisma.liquidation.update({
    where: { id },
    data: {
      propietario: data.propietario,
      ubicacion: data.ubicacion,
      superficie: Number(data.superficie),
      total: Number(data.total),
      status: data.status,
    },
    include: {
      category: true,
    },
  });
};

// DELETE
export const deleteLiquidationRepo = async (id: number) => {
  return await prisma.liquidation.delete({
    where: {
      id,
    },
  });
};


export const changeLiquidationStatusRepo = async (
  id: number,
  status: LiquidationStatus
) => {
  return await prisma.liquidation.update({
    where: { id },
    data: {
      status,
    },
    include: {
      category: true,
    },
  });
};