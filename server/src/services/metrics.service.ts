import { getSystemMetricsRepo } from "../repository/metrics.repository";

export const getSystemMetricsService =
  async () => {
    return await getSystemMetricsRepo();
  };