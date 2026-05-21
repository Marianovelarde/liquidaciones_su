"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSystemMetrics = void 0;
const metrics_service_1 = require("../services/metrics.service");
const getSystemMetrics = async (req, res) => {
    try {
        const metrics = await (0, metrics_service_1.getSystemMetricsService)();
        res.json(metrics);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error obteniendo métricas",
        });
    }
};
exports.getSystemMetrics = getSystemMetrics;
