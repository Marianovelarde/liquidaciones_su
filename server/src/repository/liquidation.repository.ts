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
    where: {
      deletedAt: null,
    },
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
  return await prisma.liquidation.findFirst({
    where: {
      id,
      deletedAt: null,
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc"
    }
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

  superficie:
    data.superficie !== undefined
      ? Number(data.superficie)
      : undefined,

  total:
    data.total !== undefined
      ? Number(data.total)
      : undefined,

  hasSurcharge: data.hasSurcharge,

  isFullSurcharge:
    data.isFullSurcharge,

  surchargeSurface:
    data.surchargeSurface !== undefined
      ? Number(data.surchargeSurface)
      : undefined,

  surchargePercent:
    data.surchargePercent !== undefined
      ? Number(data.surchargePercent)
      : undefined,

  status: data.status,

  receiptNumber:
    data.receiptNumber
},
    include: {
      category: true,
    },
  });
};

// DELETE
export const deleteLiquidationRepo = async (id: number) => {
  return await prisma.liquidation.update({
    where: {
      id,
    },
    data: {
      deletedAt: new Date(),
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