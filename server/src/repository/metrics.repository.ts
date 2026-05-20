import prisma from "../prisma/client";

export const getSystemMetricsRepo =
  async () => {

    //////////////////////////////////////////////////////
    // MÉTRICAS PRINCIPALES
    //////////////////////////////////////////////////////

    const totalLiquidations =
      await prisma.liquidation.count();

    const totalM2 =
      await prisma.liquidation.aggregate({
        _sum: {
          superficie: true,
        },
      });

    const totalAmount =
      await prisma.liquidation.aggregate({
        _sum: {
          total: true,
        },
      });

    //////////////////////////////////////////////////////
    // PAGADAS
    //////////////////////////////////////////////////////

    const paidLiquidations =
      await prisma.liquidation.count({
        where: {
          status: "PAGADO",
        },
      });

    const paidAmount =
      await prisma.liquidation.aggregate({
        where: {
          status: "PAGADO",
        },
        _sum: {
          total: true,
        },
      });

    //////////////////////////////////////////////////////
    // PENDIENTES
    //////////////////////////////////////////////////////

    const pendingLiquidations =
      await prisma.liquidation.count({
        where: {
          status:
            "PENDIENTE_DE_PAGO",
        },
      });

    //////////////////////////////////////////////////////
    // PROMEDIO
    //////////////////////////////////////////////////////

    const averageAmount =
      await prisma.liquidation.aggregate({
        _avg: {
          total: true,
        },
      });

    //////////////////////////////////////////////////////
    // ÚLTIMA LIQUIDACIÓN
    //////////////////////////////////////////////////////

    const lastLiquidation =
      await prisma.liquidation.findFirst({
        orderBy: {
          createdAt: "desc",
        },

        select: {
          id: true,

          emissionNumber: true,

          propietario: true,

          total: true,

          createdAt: true,
        },
      });

    //////////////////////////////////////////////////////
    // RETURN
    //////////////////////////////////////////////////////

    return {
      totalLiquidations,

      totalM2:
        totalM2._sum.superficie || 0,

      totalAmount:
        totalAmount._sum.total || 0,

      paidLiquidations,

      paidAmount:
        paidAmount._sum.total || 0,

      pendingLiquidations,

      averageAmount:
        averageAmount._avg.total || 0,

      lastLiquidation,
    };
  };