"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeLiquidationStatus = exports.deleteLiquidation = exports.updateLiquidation = exports.getLiquidationById = exports.getAllLiquidations = exports.createLiquidation = void 0;
const liquidation_service_1 = require("../services/liquidation.service");
//////////////////////////////////////////////////////
// CREATE
//////////////////////////////////////////////////////
const createLiquidation = async (req, res) => {
    try {
        const liquidation = await (0, liquidation_service_1.createLiquidationService)(req.body, {
            id: req.user.id,
            role: req.user.role,
        }, req.ip);
        res.status(201).json(liquidation);
    }
    catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};
exports.createLiquidation = createLiquidation;
//////////////////////////////////////////////////////
// GET ALL
//////////////////////////////////////////////////////
const getAllLiquidations = async (req, res) => {
    try {
        const liquidations = await (0, liquidation_service_1.getAllLiquidationsService)();
        res.json(liquidations);
    }
    catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};
exports.getAllLiquidations = getAllLiquidations;
//////////////////////////////////////////////////////
// GET BY ID
//////////////////////////////////////////////////////
const getLiquidationById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const liquidation = await (0, liquidation_service_1.getLiquidationByIdService)(id);
        res.json(liquidation);
    }
    catch (error) {
        res.status(404).json({
            error: error.message,
        });
    }
};
exports.getLiquidationById = getLiquidationById;
//////////////////////////////////////////////////////
// UPDATE
//////////////////////////////////////////////////////
const updateLiquidation = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const liquidation = await (0, liquidation_service_1.updateLiquidationService)(id, req.body, {
            id: req.user.id,
            role: req.user.role,
        }, req.ip);
        res.json(liquidation);
    }
    catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};
exports.updateLiquidation = updateLiquidation;
//////////////////////////////////////////////////////
// DELETE
//////////////////////////////////////////////////////
const deleteLiquidation = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const result = await (0, liquidation_service_1.deleteLiquidationService)(id, {
            id: req.user.id,
            role: req.user.role,
        }, req.ip);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};
exports.deleteLiquidation = deleteLiquidation;
//////////////////////////////////////////////////////
// CHANGE STATUS
//////////////////////////////////////////////////////
const changeLiquidationStatus = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { status } = req.body;
        const changeLiquidation = await (0, liquidation_service_1.changeLiquidationStatusService)(id, status, {
            id: req.user.id,
            role: req.user.role,
        }, req.ip);
        res.json(changeLiquidation);
    }
    catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};
exports.changeLiquidationStatus = changeLiquidationStatus;
