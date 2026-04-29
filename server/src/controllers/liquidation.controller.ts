// src/controllers/liquidation.controller.ts

import { Request, Response } from "express";

import {
  createLiquidationService,
  getAllLiquidationsService,
  getLiquidationByIdService,
  updateLiquidationService,
  deleteLiquidationService,
  changeLiquidationStatusService
} from "../services/liquidation.service";

import { LiquidationStatus } from "@prisma/client";
// CREATE
export const createLiquidation = async (
  req: Request,
  res: Response
) => {
  try {
    const liquidation = await createLiquidationService(req.body);

    res.status(201).json(liquidation);
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};


// GET ALL
export const getAllLiquidations = async (
  _req: Request,
  res: Response
) => {
  try {
    const liquidations = await getAllLiquidationsService();

    res.json(liquidations);
  } catch (error: any) {
    res.status(500).json({
      error: "Error al obtener las liquidaciones",
    });
  }
};


// GET BY ID
export const getLiquidationById = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const liquidation = await getLiquidationByIdService(id);

    res.json(liquidation);
  } catch (error: any) {
    res.status(404).json({
      error: error.message,
    });
  }
};


// UPDATE
export const updateLiquidation = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const liquidation = await updateLiquidationService(
      id,
      req.body
    );

    res.json(liquidation);
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};


// DELETE
export const deleteLiquidation = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    await deleteLiquidationService(id);

    res.json({
      message: "Liquidación eliminada correctamente",
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// CHANGE STATUS

export const changeLiquidationStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    if (
      !Object.values(LiquidationStatus).includes(status)
    ) {
      return res.status(400).json({
        error: "Estado inválido",
      });
    }

    const changeLiquidation =
      await changeLiquidationStatusService(
        id,
        status as LiquidationStatus
      );

    res.json(changeLiquidation);
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};