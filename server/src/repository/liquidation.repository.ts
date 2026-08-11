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
    data: {
      emissionNumber: data.emissionNumber,

      expedienteNumero: data.expedienteNumero,
      expedienteCodigo: data.expedienteCodigo,
      expedienteAnio: data.expedienteAnio,

      carpetaNumero: data.carpetaNumero,
      carpetaLetra: data.carpetaLetra,
      carpetaAnio: data.carpetaAnio,

      distrito: data.distrito,
      zona: data.zona,
      manzana: data.manzana,
      parcela: data.parcela,

      propietario: data.propietario,
      cuil: data.cuil,
      ubicacion: data.ubicacion,
      tipoObra: data.tipoObra,
      concepto: data.concepto,

      superficie: data.superficie,

      categoryId: data.categoryId,
      createdById: data.createdById,

      hasSurcharge: data.hasSurcharge,

      isFullSurcharge: data.hasSurcharge ? data.isFullSurcharge ?? false : null,

      surchargeSurface: data.hasSurcharge
        ? data.surchargeSurface ?? null
        : null,

      surchargePercent: data.hasSurcharge
        ? data.surchargePercent ?? null
        : null,

      observations: data.observations,

      receiptNumber: data.receiptNumber,

      total: data.total,
    },
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
  data:  any
) => {
  return await prisma.liquidation.update({
    where: { id },
data: {
  propietario: data.propietario,
  cuil: data.cuil,
  ubicacion: data.ubicacion,
  concepto: data.concepto,
  tipoObra: data.tipoObra,

  expedienteNumero: data.expedienteNumero,
  expedienteCodigo: data.expedienteCodigo,
  expedienteAnio: data.expedienteAnio,

  carpetaNumero: data.carpetaNumero,
  carpetaLetra: data.carpetaLetra,
  carpetaAnio: data.carpetaAnio,

  distrito: data.distrito,
  zona: data.zona,
  manzana: data.manzana,
  parcela: data.parcela,

  superficie:
    data.superficie !== undefined
      ? Number(data.superficie)
      : undefined,

  categoryId:
    data.categoryId !== undefined
      ? Number(data.categoryId)
      : undefined,

  hasSurcharge: data.hasSurcharge,

  isFullSurcharge:
    data.hasSurcharge
      ? data.isFullSurcharge ?? false
      : null,

  surchargeSurface:
    data.surchargeSurface !== undefined
      ? Number(data.surchargeSurface)
      : undefined,

  surchargePercent:
    data.surchargePercent !== undefined
      ? Number(data.surchargePercent)
      : undefined,

  total:
    data.total !== undefined
      ? Number(data.total)
      : undefined,

  status: data.status,

  receiptNumber: data.receiptNumber,

  observations: data.observations,
}
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