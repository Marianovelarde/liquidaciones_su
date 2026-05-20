import { Request, Response } from "express";

import {
  createLiquidationService,
  getAllLiquidationsService,
  getLiquidationByIdService,
  updateLiquidationService,
  deleteLiquidationService,
  changeLiquidationStatusService,
} from "../services/liquidation.service";

import { LiquidationStatus } from "@prisma/client";

//////////////////////////////////////////////////////
// CREATE
//////////////////////////////////////////////////////

export const createLiquidation = async (
  req: Request,
  res: Response
) => {
  try {
    const liquidation =
      await createLiquidationService(
        req.body,

        {
          id: (req as any).user.id,
          role: (req as any).user.role,
        },

        req.ip
      );

    res.status(201).json(liquidation);

  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

//////////////////////////////////////////////////////
// GET ALL
//////////////////////////////////////////////////////

export const getAllLiquidations = async (
  req: Request,
  res: Response
) => {
  try {
    const liquidations =
      await getAllLiquidationsService();

    res.json(liquidations);

  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

//////////////////////////////////////////////////////
// GET BY ID
//////////////////////////////////////////////////////

export const getLiquidationById = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const liquidation =
      await getLiquidationByIdService(id);

    res.json(liquidation);

  } catch (error: any) {
    res.status(404).json({
      error: error.message,
    });
  }
};

//////////////////////////////////////////////////////
// UPDATE
//////////////////////////////////////////////////////

export const updateLiquidation = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const liquidation =
      await updateLiquidationService(
        id,
        req.body,

        {
          id: (req as any).user.id,
          role: (req as any).user.role,
        },

        req.ip
      );

    res.json(liquidation);

  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

//////////////////////////////////////////////////////
// DELETE
//////////////////////////////////////////////////////

export const deleteLiquidation = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const result =
      await deleteLiquidationService(
        id,

        {
          id: (req as any).user.id,
          role: (req as any).user.role,
        },

        req.ip
      );

    res.json(result);

  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

//////////////////////////////////////////////////////
// CHANGE STATUS
//////////////////////////////////////////////////////

export const changeLiquidationStatus =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const id = Number(req.params.id);

      const { status } = req.body;

      const changeLiquidation =
        await changeLiquidationStatusService(
          id,

          status as LiquidationStatus,

          {
            id: (req as any).user.id,
            role: (req as any).user.role,
          },

          req.ip
        );

      res.json(changeLiquidation);

    } catch (error: any) {
      res.status(400).json({
        error: error.message,
      });
    }
  };