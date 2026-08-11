// src/services/liquidation.services.ts
import prisma from "../prisma/client";
import {
  createLiquidationRepo,
  getAllLiquidationsRepo,
  getLiquidationByIdRepo,
  updateLiquidationRepo,
  deleteLiquidationRepo,
  changeLiquidationStatusRepo,
} from "../repository/liquidation.repository";

import {
  CreateLiquidationDTO,
  UpdateLiquidationDTO,
} from "../dtos/liquidation.dto";

import {
  LiquidationStatus,
  AuditAction,
  UserRole,
} from "@prisma/client";

import { createAuditLogService } from "./audit.service";

//////////////////////////////////////////////////////
// CREATE
//////////////////////////////////////////////////////

export const createLiquidationService = async (
  data: CreateLiquidationDTO,
  user: {
    id: number;
    role: UserRole;
  },
  ipAddress?: string
) => {
  //////////////////////////////////////////////////////
  // VALIDACIONES
  //////////////////////////////////////////////////////

  if (!data.propietario) {
    throw new Error("El propietario es obligatorio");
  }
  if (!data.cuil) {
  throw new Error("El CUIL es obligatorio");
}

  if (!data.categoryId) {
    throw new Error(
      "Debe seleccionar una categoría"
    );
  }

  if (!data.emissionNumber) {
    throw new Error(
      "El número de liquidación es obligatorio"
    );
  }

//////////////////////////////////////////////////////
// VALIDACIONES DE RECARGO
//////////////////////////////////////////////////////

if (data.hasSurcharge) {

 if (data.surchargePercent == null) {
    throw new Error(
      "Debe ingresar el porcentaje de recargo"
    );
  }

  if (data.isFullSurcharge === undefined) {
    throw new Error(
      "Debe indicar si el recargo aplica a toda la superficie."
    );
  }

  if (
    !data.isFullSurcharge &&
    (
      data.surchargeSurface === undefined ||
      data.surchargeSurface <= 0
    )
  ) {
    throw new Error(
      "Debe ingresar la superficie afectada por el recargo."
    );
  }

  if (
    !data.isFullSurcharge &&
    data.surchargeSurface! > data.superficie
  ) {
    throw new Error(
      "La superficie con recargo no puede superar la superficie total."
    );
  }

}
  //////////////////////////////////////////////////////
  // CREAR LIQUIDACIÓN
  //////////////////////////////////////////////////////

  const createdLiquidation =
    await createLiquidationRepo(data);
console.log("createdLiquidation", data);
  //////////////////////////////////////////////////////
  // AUDITORÍA
  //////////////////////////////////////////////////////

  await createAuditLogService({
    userId: user.id,

    userRole: user.role,

    liquidationId: createdLiquidation.id,

    action: AuditAction.CREATE,

    field: null,

    oldValue: null,

  newValue: `Liquidación #${createdLiquidation.emissionNumber} creada`,

    ipAddress,
  });

  return createdLiquidation;
};

//////////////////////////////////////////////////////
// GET ALL
//////////////////////////////////////////////////////

export const getAllLiquidationsService =
  async () => {
    return await getAllLiquidationsRepo();
  };

//////////////////////////////////////////////////////
// GET BY ID
//////////////////////////////////////////////////////

export const getLiquidationByIdService =
  async (id: number) => {
    const liquidation =
      await getLiquidationByIdRepo(id);

    if (!liquidation) {
      throw new Error(
        "Liquidación no encontrada"
      );
    }

    return liquidation;
  };

//////////////////////////////////////////////////////
// UPDATE
//////////////////////////////////////////////////////

export const updateLiquidationService =
  async (
    id: number,
    data: UpdateLiquidationDTO,
    user: {
      id: number;
      role: UserRole;
    },
    ipAddress?: string
  ) => {

    //////////////////////////////////////////////////////
    // ORIGINAL
    //////////////////////////////////////////////////////

    const oldLiquidation =
      await getLiquidationByIdService(id);

    //////////////////////////////////////////////////////
    // UPDATE
    //////////////////////////////////////////////////////

    //////////////////////////////////////////////////////
// OBTENER CATEGORÍA
//////////////////////////////////////////////////////

const category = await prisma.category.findUnique({
  where: {
    id:
      data.categoryId ??
      oldLiquidation.categoryId,
  },
});


if (!category) {
  throw new Error("Categoría no encontrada");
}

//////////////////////////////////////////////////////
// RECALCULAR TOTAL
//////////////////////////////////////////////////////

const superficie =
  Number(data.superficie ?? oldLiquidation.superficie);

const subtotal =
  superficie *
  category.coefficient *
  category.pricePerM2;

let surchargeValue = 0;

const hasSurcharge =
  data.hasSurcharge ?? oldLiquidation.hasSurcharge;

if (hasSurcharge) {


  
  const surchargePercent =
    Number(
      data.surchargePercent ??
      oldLiquidation.surchargePercent
    );

  const isFullSurcharge =
    data.isFullSurcharge ??
    oldLiquidation.isFullSurcharge;

  const surchargeSurface = isFullSurcharge
    ? superficie
    : Number(
        data.surchargeSurface ??
        oldLiquidation.surchargeSurface
      );

  const surchargeSubtotal =
    surchargeSurface *
    category.coefficient *
    category.pricePerM2;

  surchargeValue =
    surchargeSubtotal *
    surchargePercent /
    100;

data.isFullSurcharge = isFullSurcharge ?? false;data.surchargeSurface = surchargeSurface;
data.surchargePercent = surchargePercent;
}

const total =
  subtotal + surchargeValue;

// Lo enviamos al repository
data.total = total;

    const updatedLiquidation =
      await updateLiquidationRepo(id, data);

    //////////////////////////////////////////////////////
    // DETECTAR CAMBIOS
    //////////////////////////////////////////////////////

    const changedFields = Object.keys(data);

    //////////////////////////////////////////////////////
    // CREAR AUDITORÍA POR CAMPO
    //////////////////////////////////////////////////////

    for (const field of changedFields) {

      const oldValue =
        oldLiquidation[
          field as keyof typeof oldLiquidation
        ];

      const newValue =
        updatedLiquidation[
          field as keyof typeof updatedLiquidation
        ];

      //////////////////////////////////////////////////////
      // EVITAR LOGS INNECESARIOS
      //////////////////////////////////////////////////////

      if (
        String(oldValue) === String(newValue)
      ) {
        continue;
      }

      await createAuditLogService({
        userId: user.id,

        userRole: user.role,

        liquidationId: updatedLiquidation.id,

        action: AuditAction.UPDATE,

        field,

        oldValue: String(oldValue),

        newValue: String(newValue),

        ipAddress,
      });
    }

    return updatedLiquidation;
  };

//////////////////////////////////////////////////////
// DELETE
//////////////////////////////////////////////////////

export const deleteLiquidationService =
  async (
    id: number,
    user: {
      id: number;
      role: UserRole;
    },
    ipAddress?: string
  ) => {
    //////////////////////////////////////////////////////
    // OBTENER ORIGINAL
    //////////////////////////////////////////////////////

    const liquidation =
      await getLiquidationByIdService(id);

    //////////////////////////////////////////////////////
    // ELIMINAR
    //////////////////////////////////////////////////////

    await deleteLiquidationRepo(id);

    //////////////////////////////////////////////////////
    // AUDITORÍA
    //////////////////////////////////////////////////////

    await createAuditLogService({
      userId: user.id,

      userRole: user.role,

      liquidationId: liquidation.id,

      action: AuditAction.DELETE,

      field: "LIQUIDATION",

      oldValue: `Liquidación #${liquidation.emissionNumber} eliminada`,

      newValue: null,

      ipAddress,
    });

    return {
      message:
        "Liquidación eliminada correctamente",
    };
  };

//////////////////////////////////////////////////////
// CHANGE STATUS
//////////////////////////////////////////////////////

export const changeLiquidationStatusService =
  async (
    id: number,
    status: LiquidationStatus,
    user: {
      id: number;
      role: UserRole;
    },
    ipAddress?: string
  ) => {
    //////////////////////////////////////////////////////
    // OBTENER ORIGINAL
    //////////////////////////////////////////////////////

    const oldLiquidation =
      await getLiquidationByIdService(id);

    //////////////////////////////////////////////////////
    // CAMBIAR STATUS
    //////////////////////////////////////////////////////

    const updatedLiquidation =
      await changeLiquidationStatusRepo(
        id,
        status
      );

    if (!updatedLiquidation) {
      throw new Error(
        "No se pudo cambiar el estado de la liquidación"
      );
    }

    //////////////////////////////////////////////////////
    // AUDITORÍA
    //////////////////////////////////////////////////////

    await createAuditLogService({
      userId: user.id,

      userRole: user.role,

      liquidationId: updatedLiquidation.id,

      action:
        AuditAction.STATUS_CHANGE,

      field: "status",

      oldValue: `Liquidación #${oldLiquidation.emissionNumber} - ${oldLiquidation.status}`,

      newValue: `Liquidación #${updatedLiquidation.emissionNumber} - ${updatedLiquidation.status}`,

      ipAddress,
    });

    return updatedLiquidation;
  };