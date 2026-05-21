"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSystemMetricsService = void 0;
const metrics_repository_1 = require("../repository/metrics.repository");
const getSystemMetricsService = async () => {
    return await (0, metrics_repository_1.getSystemMetricsRepo)();
};
exports.getSystemMetricsService = getSystemMetricsService;
