import prisma from "../prisma/client";

export const createAuditLogRepository = (
  data: any
) => {
  return prisma.auditLog.create({
    data,
  });
};

export const getAuditLogsRepository = () => {
  return prisma.auditLog.findMany({
  include: {
  user: {
    select: {
      id: true,
      username: true,
      role: true,
    },
  },

  liquidation: {
    select: {
      id: true,
      emissionNumber: true,
      propietario: true,
      ubicacion: true,
      status: true,
    },
  },
},
    orderBy: {
      createdAt: "desc",
    },
  });
};